import { Optional } from "utility-types"
import { Element, ElementDict, register_element, register_elements } from "./elemtoml"
import { parse } from "@iarna/toml"
import { run_script } from "../mod/run_scripts"


/**
 * Configuration for the scripts section
 */
export type ScriptCfg = {
    preload?: string[],
    postload?: string[]
}

/**
 * ExternalElement info (for import)
 */
type ElementImport = {
    path: string,
    name: string,
}

// Mod config
export type ModConfig = {
    name?: string,
    version: string,
    description?: string,
    entry_point: string,
    external_elements: ElementImport[],
    incompatible_mods?: string[]
}

export type ParsedPackageConfig = {
    mod: ModConfig
    scripts: ScriptCfg
}

/**
 * A mod
 */
export class Mod {
    /**
     * The TOML config for this package.
     */
    cfg: ParsedPackageConfig;
    /**
     * The path the mod is from
     */
    path_from: string;

    /**
     * The list of elements that have been loaded for this package.
     */
    loaded_elems: Element[] = [];

    /**
     * Constructs a new Package instance with the given configuration (as loaded
     * from a TOML configuration).
     * 
     * @param config The parsed package configuration.
     */
    constructor(config: ParsedPackageConfig, path_from: string){
        this.cfg = config
        this.path_from = path_from
    }

    /**
     * Loads external elements defined in the package configuration.
     * Fetches, parses, and registers each element.
     * 
     * @returns A promise that resolves to an `ElementDict`
     * @private
     */
    private async load_elems(this: Mod): Promise<ElementDict>{
        for (const i of this.cfg.mod.external_elements) {
            console.log("loading element:", i)
            try{
                let resp = await fetch(i.path)
                const parsed = parse(await resp.text())
                console.log("Parsed elem:", parsed as any as Element)
                register_element(i.name, parsed as any as Element)
            }
            catch (err) {
                console.error(err)
            }
        }

        let tmp: ElementDict = {}
        this.loaded_elems.forEach(elem => {
            tmp[elem.name] = elem
        });

        return tmp
    }

    /**
     * Retrieves the list of elements that have been loaded for this package.
     * @returns An array of loaded elements.
     */
    get_loaded_elems(this: Mod): Element[]{
        return this.loaded_elems
    }

    get_info(this: Mod): ModConfig{
        return this.cfg.mod
    }

    /**
     * Loads the mod, runs scripts, and registers elements.
     */
    load_mod(prompt_quene: Function[]): void{
        if(this.cfg.mod.incompatible_mods != undefined){
            console.log("whar")
            const incompatibilities = window.enabledMods
                .filter((x) => 
                    this.cfg.mod.incompatible_mods !== undefined && 
                    this.cfg.mod.incompatible_mods.includes(x)
                )

            if (incompatibilities.length != 0) {
                // TODO: throw an error and do this in the calling code
                prompt_quene.push(() => {
                    window.promptText(
                        `A: ${this.path_from} \n\
                        B: ${incompatibilities.join(", ")}`,
                        () => {},
                        "Mod incompatibility"
                    )
                });
                return;
            }   
        }
        console.debug(this.cfg.scripts)
        if (this.cfg.scripts.preload !== undefined){
            for(const i of this.cfg.scripts.preload){
                run_script(i)
            }
        }

        this.load_elems().then((elems) => {
            console.debug("elems:", elems)
            register_elements(elems)
        });
        

        if (this.cfg.scripts.postload !== undefined){
            for(const i of this.cfg.scripts.postload){
                run_script(i)
            }
        }
    };
}

// What could *possibly* go wrong, indeed
export function load(object: any): ParsedPackageConfig{    
    return object as ParsedPackageConfig
}


import { Optional } from "utility-types"
import { Element, ElementDict, register_element, register_elements } from "./elemtoml"
import { parse } from "@iarna/toml"
import { run_script } from "./utils"


export type _ScriptCfg = {
    preload: Array<string>,
    postload: Array<string>
}

/**
 * ExternalElement info (for import)
 */
type ElementImport = {
    path: string,
    name: string,
}

/**
 * Config entry for a script config
 */
type ScriptCfg = Partial<_ScriptCfg>

// Mod config
export type ModConfig = {
    name: string
    version: string
    entry_point: string
    external_elements: Array<ElementImport>
    incompatible_mods: Array<string>
}

export type ParsedPackageConfig = {
    mod: ModConfig
    scripts: ScriptCfg
}

/**
 * A mod
 */
export class Package {
    /**
     * The TOML config for this package.
     */
    cfg: ParsedPackageConfig;

    /**
     * The list of elements that have been loaded for this package.
     */
    loaded_elems: Array<Element> = [];

    /**
     * Constructs a new Package instance with the given configuration (as loaded
     * from a TOML configuration).
     * 
     * @param config The parsed package configuration.
     */
    constructor(config: ParsedPackageConfig){
        this.cfg = config
        console.log(this)
    }

    /**
     * Loads external elements defined in the package configuration.
     * Fetches, parses, and registers each element.
     * 
     * @returns A promise that resolves to an `ElementDict`
     * @private
     */
    private async load_elems(this: Package): Promise<ElementDict>{
        for (const i of this.cfg.mod.external_elements) {
            console.log("loading element:", i)
            try{
                let resp = await fetch(i.path)
                const parsed = parse(await resp.text())
                console.log(parsed)
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
    get_loaded_elems(this: Package): Array<Element>{
        return this.loaded_elems
    }

    /**
     * Loads the mod by running preload scripts, loading elements, and running postload scripts.
     * Registers loaded elements after fetching and parsing them.
     */
    load_mod(): void{
        const incompatibilities = window.enabledMods
            .filter((x) => this.cfg.mod.incompatible_mods.includes(x))

        if (incompatibilities.length != 0) {
            // TODO: throw an error and do this in the calling code
            window.addEventListener('load', () => {
                window.promptText(
                    `A: ${this.cfg.mod.name} \n\
                    B: ${incompatibilities.join(", ")}`,
                    () => {},
                    "Mod incompatibility"
                )
            });
            return;
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


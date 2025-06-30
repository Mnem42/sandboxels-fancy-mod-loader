import { Optional } from "utility-types"
import { Element, ElementDict, register_element, register_elements } from "./elemtoml"
import { parse } from "@iarna/toml"
import { run_script } from "./utils"

export type _ScriptCfg = {
    preload: Array<string>,
    postload: Array<string>
}

// Element info (for imports)
type ElementImport = {
    path: string,
    name: string,
}

type ScriptCfg = Partial<_ScriptCfg>

// Mod config
export type ModConfig = {
    name: string
    version: string
    entry_point: string
    external_elements: Array<ElementImport>
}

export type ParsedPackageConfig = {
    mod: ModConfig
    scripts: ScriptCfg
}

export class Package{
    cfg: ParsedPackageConfig
    loaded_elems: Array<Element> = []

    constructor(config: ParsedPackageConfig){
        this.cfg = config
        console.log(this)
    }

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

    get_loaded_elems(this: Package){
        return this.loaded_elems
    }


    load_mod(){
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
    }
}

// What could *possibly* go wrong, indeed
export function load(object: any): ParsedPackageConfig{    
    return object as ParsedPackageConfig
}


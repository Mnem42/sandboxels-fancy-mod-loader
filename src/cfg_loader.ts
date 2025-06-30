import { Optional } from "utility-types"
import { Element, ElementDict, register_element, register_elements } from "./elemtoml"
import { parse } from "@iarna/toml"

// Element info (for imports)
type _ElementImport = {
    path: string,
    name: string,
    postload_script: string
}

type ElementImport = Optional<_ElementImport, "postload_script">

// Mod config
export type ModConfig = {
    name: string
    version: string
    entry_point: string
    external_elements: Array<ElementImport>
}

export type ParsedPackageConfig = {
    mod: ModConfig
}

export class Package{
    cfg: ParsedPackageConfig
    loaded_elems: Array<Element> = []

    constructor(config: ParsedPackageConfig){
        this.cfg = config
        console.log(this)
    }

    async load_elems(this: Package): Promise<ElementDict>{
        for (const i of this.cfg.mod.external_elements) {
            console.log(i)

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

    run(){
        fetch(this.cfg.mod.entry_point)
            .then((resp) => {
                resp.text().then((x) => Function(x)())
            }) // What could *possibly* go wrong
    }
}

// What could *possibly* go wrong, indeed
export function load(object: any): ParsedPackageConfig{    
    return object as ParsedPackageConfig
}


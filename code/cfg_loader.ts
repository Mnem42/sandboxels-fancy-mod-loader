import { Element, register_element, register_elements } from "./elemtoml"
import { parse } from "@iarna/toml"

type ElementImport = {
    path: string,
    name: string
}

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

    async load_elems(this: Package){
        for (const i of this.cfg.mod.external_elements) {
            console.log(i)

            try{
                let resp = await fetch(i.path)
                const parsed = parse(await resp.text())
                console.log(parsed)
                register_element(i.name, parsed as Element)
            }
            catch (err) {
                console.error(err)
            }
        }
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


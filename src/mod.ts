import "./glue"
import { load, Package} from "./cfg_loader"
import toml from "@iarna/toml"
import { find_mod } from "./mod_finder"
import "./elemtoml"
import {register_elements, Element } from "./elemtoml"

for(const i of window.enabledMods){
    if (i.endsWith(".toml")) {    
        console.trace("Loading mod:", i, i.slice(0, -5))   
        find_mod(i.slice(0, -5), (text) =>{
            const parsed = toml.parse(text)
            console.debug("Parsed mod TOML:", toml.parse(text))            
            
            let pkg = new Package(load(parsed))
            pkg.load_elems().then((elems) => {
                register_elements(elems)
            });

            console.debug("Loaded mod:", pkg)
        })
    }
}

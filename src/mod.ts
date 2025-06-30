import "./glue"
import { load, Package} from "./cfg_loader"
import toml from "@iarna/toml"
import { find_mod } from "./mod_finder"
import "./elemtoml"
import {register_elements, Element } from "./elemtoml"

find_mod("loader_test", (text) =>{
    const parsed = toml.parse(text)
    console.log("important shit:", toml.parse(text))
    
    let pkg = new Package(load(parsed))
    pkg.load_elems().then(() => {
        console.log(pkg)
        console.log(pkg.get_loaded_elems())
    });
})

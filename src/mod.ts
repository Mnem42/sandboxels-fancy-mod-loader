import "./glue"
import { load, Package} from "./cfg_loader"
import toml from "@iarna/toml"
import { find_mod } from "./mod_finder"
import "./elemtoml"
import {register_elements, Element } from "./elemtoml"

function shuffle_to_start(input: Array<string>, i: number): Array<string>{
    let tmp = input.filter((x) => x !== input[i])
    tmp.unshift(input[i])
    return tmp
}

let prompt_quene: Array<Function> = []

const mods: Array<string> = JSON.parse(localStorage.getItem("enabledMods") || "")
if (mods[0] !== "mods/fancy_loader.js"){
    prompt_quene.push(()=>{
        window.promptConfirm(
            `Refresh again to reload as the first mod (otherwise, there can be\
            odd glitches with dependencies etc.)`, 
            (x) => {if(x) {window.location.reload()}}, 
            "fancy_loader.js says..."
        )
    });

    const shuffled_mods = shuffle_to_start(mods, mods.findIndex((x) => x == "mods/fancy_loader.js"))
    localStorage.setItem("enabledMods", JSON.stringify(shuffled_mods))
}

for(const i of window.enabledMods){    
    if (i.endsWith(".toml")) {    
        console.trace("Loading mod:", i, i.slice(0, -5))   
        find_mod(i.slice(0, -5), (text) =>{
            const parsed = toml.parse(text)
            console.debug("Parsed mod TOML:", toml.parse(text))            
            
            let pkg = new Package(load(parsed))
            pkg.load_mod(prompt_quene)

            console.debug("Loaded mod:", pkg)
        })
    }
}

window.addEventListener('load', () => {
    for(const i of prompt_quene){
        i()
    }
})
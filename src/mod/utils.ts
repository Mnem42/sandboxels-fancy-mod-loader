import { load, ModConfig, Mod } from "../loader/cfg_loader";
import { find_mod } from "../loader/mod_finder";
import toml from "@iarna/toml"

export {check_if_at_start, load_mods}

function shuffle_to_start(input: Array<string>, i: number): Array<string>{
    let tmp = input.filter((x) => x !== input[i])
    tmp.unshift(input[i])
    return tmp
}

// Checks if the mod is at the start
function check_if_at_start(prompt_quene: Array<Function>){
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
}

async function load_mods(
    prompt_quene: Function[], 
    onload: (pkg: Mod) => void
){
    for(const i of window.enabledMods){    
        if (i.endsWith(".toml")) {    
            console.trace("Loading mod:", i, i.slice(0, -5))   
            await find_mod(i.slice(0, -5), (text) =>{
                const parsed = toml.parse(text)
                console.debug("Parsed mod TOML:", toml.parse(text))            
                
                let pkg = new Mod(load(parsed), i)
                onload(pkg)

                console.debug("Loaded mod:", pkg)
            })
        }
    }
}
import { load, Mod, ParsedPackageConfig } from "../loader/cfg_loader"
import { find_mod } from "../loader/mod_finder"
import toml from "@iarna/toml"

export function add_modinfo_btn(mod: Mod){
    let menu = document.getElementById("modManagerList")

    if (menu == undefined){
        throw Error("modManagerList not a valid id")
    }
    else{
        let item = menu.querySelector(`[href="${mod.path_from}"]`)
        
        if (item){
            let elem = document.createElement('button')
            elem.classList.add("infobtn")
            elem.innerText = 'i'
            elem.onclick = () =>{
                window.promptText(
                    `Version: ${mod.cfg.mod.version}\n\
                    Description: ${mod.cfg.mod.description}`,
                    () => {},
                    mod.path_from
                )
            }

            item.parentNode?.appendChild(elem)
        }
    }
}
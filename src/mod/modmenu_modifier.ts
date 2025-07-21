import { Mod } from "../loader/cfg_loader"
import { show_modinfo } from "./modinfo_menu"

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
            elem.onclick = () => {
                show_modinfo(
                    mod.cfg.mod.name ?? mod.path_from,
                    mod.cfg.mod.version, 
                    mod.cfg.mod.description
                )
            }

            item.parentNode?.appendChild(elem)
        }
    }
}
import { Mod } from "../loader/cfg_loader"

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
                    () => {
                        // Make the mod manager visible again
                        window.showModManager()
                    },
                    mod.cfg.mod.name ?? mod.path_from
                )
            }

            item.parentNode?.appendChild(elem)
        }
    }
}
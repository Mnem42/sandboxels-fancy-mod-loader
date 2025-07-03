import { load, Package, ParsedPackageConfig } from "../loader/cfg_loader"
import { find_mod } from "../loader/mod_finder"
import toml from "@iarna/toml"

export function add_modinfo_btns(enabled_mods: Array<string>){
    let menu = document.getElementById("modManagerList")

    if (menu == undefined){
        throw Error("modManagerList not a valid id")
    }
    else{
        for(let i of menu.childNodes){
            const name = (i.childNodes[0] as Element).innerHTML
            
            if (name.endsWith(".toml")){
                let elem = document.createElement('button')
                elem.classList.add("infobtn")
                elem.innerText = 'i'
                elem.onclick = () =>{
                    find_mod("mods/" + name.split('.')[0], (result) => {
                        let loaded = toml.parse(result) as ParsedPackageConfig
                        window.promptText(
                            `Version: ${loaded.mod.version}\nDescription: ${loaded.mod.description}`,
                            () => {},
                            name
                        )
                    })
                }

                console.log(i)
                i.appendChild(elem)
            }
        }
    }
}
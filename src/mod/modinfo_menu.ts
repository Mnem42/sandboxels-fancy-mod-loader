import { MODINFO_BASE_HTML, MODINFO_DESCRIPTION_PLACEHOLDER } from "../util/html_css_constants"


// ---- Initialise prompt, but hide it to start with
{
    let gamediv = document.getElementById("gameDiv")

    let div = document.createElement('div')
    div.classList.add("menuParent")
    div.id = "modinfo_parent"
    div.innerHTML = MODINFO_BASE_HTML

    // It's guaranteed to be an html element
    let closebtn = div.firstElementChild as HTMLElement
    closebtn.onclick = () => {
        div.style.display = "none"
    }

    gamediv?.appendChild(div)
}

/// Show the mod info menu
export function show_modinfo(
    name: string, 
    version: string, 
    description: string | undefined
){
    let elem = document.getElementById("modinfo_parent")
    if (elem){
        let version_elem = document.getElementById("mod_version")
        let description_elem = document.getElementById("mod_description")
        let name_elem = document.getElementById("mod_name")

        if (version_elem && description_elem && name_elem){
            name_elem.textContent = name 
            version_elem.textContent = "Version: " + version
            
            if (description) description_elem.innerText = "Description: " + description
            else description_elem.innerHTML = MODINFO_DESCRIPTION_PLACEHOLDER
        }

        elem.style.display = "block"
    }
    else {
        throw "Mod info menu div not initialised, probably because modinfo_menu.ts\
               somehow got imported before this got called"
    }
}
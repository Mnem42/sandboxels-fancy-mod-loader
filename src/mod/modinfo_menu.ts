/// Base HTML to generate the mod info menu from
const BASE_HTML = `
<div id="modInfo" class="menuScreen">
    <button class="XButton">-</button>
    <span id="mod_name" class="menuTitle" style="color: unset;"></span>
    <div class="menuText" style="padding-top:1em">
        <div id="promptMenuText">
            <span id="mod_version"></span>
            <br>                    
            <span id="mod_description">s</span>
        </span>
        <br><br><br>
    </div>
</div>
`

/// Placeholder CSS
const PLACEHOLDER_CSS = `
    color: #666666;\
    font-style: italic;
`

/// Description placeholder HTML
const DESCRIPTION_PLACEHOLDER = `
<span style="${PLACEHOLDER_CSS}">
    No description provided
</span>
`

// ---- Initialise prompt, but hide it to start with
{
    let gamediv = document.getElementById("gameDiv")

    let div = document.createElement('div')
    div.classList.add("menuParent")
    div.id = "modinfo_parent"
    div.innerHTML = BASE_HTML

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
            else description_elem.innerHTML = DESCRIPTION_PLACEHOLDER
        }

        elem.style.display = "block"
    }
    else {
        throw "Mod info menu div not initialised, probably because modinfo_menu.ts\
               somehow got imported before this got called"
    }
}
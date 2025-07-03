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

                console.log(i)
                i.appendChild(elem)
            }
        }
    }
}
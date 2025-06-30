// Deals with searching for mods

export function find_mod(name: string, onfind: (result: string) => void){
    console.log(name, `${name}/mod.toml`)
    fetch(`${name}/mod.toml`)
        .then(async (x) => {
            console.log(x.url)
            if (x.ok) {
                onfind(await x.text());
            }
            else{
                // Fallback to sandboxels default behaviour
                window.queuedMods.push(name)
            }
        })
        .catch((err) => {console.error(err)})
}
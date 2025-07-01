/**
 * Finds a mod.
 * 
 * @param name Name of mod to find
 * @param onfind Callback to run after finding mod
 */
export function find_mod(name: string, onfind: (result: string) => void){
    console.log(name, `${name}/mod.toml`)
    fetch(`${name}/mod.toml`)
        .then(async (x) => {
            console.log(x.url)
            if (x.ok) {
                onfind(await x.text());
            }
            else{
                // Do nothing, let sandboxels figure it out on its own
            }
        })
        .catch((err) => {console.error(err)})
}
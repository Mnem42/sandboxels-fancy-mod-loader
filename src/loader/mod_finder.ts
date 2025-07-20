/**
 * Finds a mod.
 * 
 * @param name Name of mod to find
 * @param onfind Callback to run after finding mod
 */
export async function find_mod(name: string, onfind: (result: string) => void){
    fetch(`${name}/mod.toml`)
        .then(async (x) => {
            if (x.ok) {
                onfind(await x.text());
            }
            else{
                // Do nothing, let sandboxels figure it out on its own
            }
        })
        .catch((err) => {console.error(err)})
}
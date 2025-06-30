// Run a script with a path
//
//* @return Exit code
export async function run_script(path: string){
    try {
        let resp = await fetch(path)
        const text = await resp.text()

        if (resp.ok) {
            // Convert the text to a function body
            const result = Function(text)()

            // Error if there was a nonzero return
            if (result !== undefined && result !== 0){
                throw Error(`Script exited with code ${result}`)
            }
        }
        else {
            throw Error(`Script ${path} not found`)
        }
    }
    catch(e) {throw e}
}
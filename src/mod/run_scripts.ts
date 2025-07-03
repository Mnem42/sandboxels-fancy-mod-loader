/**
 * Error for problems when running a script
 */
export class ScriptRunError extends Error {
	constructor(message: string, asserter=undefined) {
        super(message);
        this.name = 'MyError';
        (Error as any).captureStackTrace?.(this, asserter || this.constructor);
	}
}

/**
 * Runs a script with a path
 * 
 * @param path 
 * @throws `ScriptRunError`
 */
export async function run_script(path: string){
    try {
        let resp = await fetch(path)
        const text = await resp.text()

        if (resp.ok) {
            // Convert the text to a function body
            const result = Function(text)()

            // Error if there was a nonzero return
            if (result !== undefined && result !== 0){
                throw new ScriptRunError(`Script exited with code ${result}`)
            }
        }
        else {
            throw new ScriptRunError(`Script ${path} not found`)
        }
    }
    catch(e) {throw e}
}
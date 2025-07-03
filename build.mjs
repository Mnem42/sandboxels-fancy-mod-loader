import * as esbuild from 'esbuild'
import * as fs from 'fs'

await esbuild.build({
    entryPoints: ['src/mod/mod.ts'],
    outfile: "sandboxels/mods/fancy_loader.js",
    platform: "browser",

    bundle: true,
    logLevel: "error",

    banner: {
        js: "// fancy_loader.js"
    },
    define: {
        global: "globalThis",
        //external_styles: stylesheet
    },
}).then((result) =>{
    let stats = fs.statSync("sandboxels/mods/fancy_loader.js")
    console.log("Build finished")
    console.log("Build output size: ", stats.size, "(B)")
})
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/mod.ts'],
  outfile: "sandboxels/mods/fancy_loader.js",
  platform: "browser",

  bundle: true,
  logLevel: "error",

  banner: {
    js: "// fancy_loader.js"
  },
  define: {
    global:"globalThis"
  },
}).then((result) =>{
    console.log("Build finished")
})
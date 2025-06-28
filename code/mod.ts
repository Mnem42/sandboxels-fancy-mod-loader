import "./glue"
import { load, Package } from "./cfg_loader"
import toml from "@iarna/toml"
import { find_mod } from "./mod_finder"

let json_string: string = `{
    "name": "Testing-mod",
    "version": "0.1.0",
    "entry_point": "https://sandboxels.r74n.com/mods/nousersthings.js"
}`

let tmp = toml.parse(`
[mod]
name = "testing-mod"
version = "0.1.0"
entry_point = "https://sandboxels.r74n.com/mods/nousersthings.js"
`)

let loaded_config = load(tmp)
new Package(loaded_config).run()
console.log(loaded_config)

find_mod("test-finder")
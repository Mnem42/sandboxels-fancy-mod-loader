import "./glue"
import "./utils"
import "../loader/elemtoml"
import "../util/style_modification"
import { load_styles as apply_styles } from "../util/style_modification"
import { check_if_at_start, load_mods } from "./utils"
import { add_modinfo_btns } from "./modmenu_modifier"

add_modinfo_btns(window.enabledMods)

let prompt_quene: Array<Function> = []

apply_styles()
check_if_at_start(prompt_quene)
load_mods(prompt_quene)

window.addEventListener('load', () => {
    for(const i of prompt_quene){
        i()
    }
})
import "./glue"
import "./utils"
import "../loader/elemtoml"
import "../util/style_modification"
import { load_styles as apply_styles } from "../util/style_modification"
import { check_if_at_start, load_mods } from "./utils"
import { add_modinfo_btn } from "./modmenu_modifier"
import { Mod } from "../loader/cfg_loader"

let prompt_quene: Array<Function> = []

apply_styles()
check_if_at_start(prompt_quene)
load_mods(prompt_quene, mod =>{
    console.log(mod)
    mod.load_mod(prompt_quene)

    add_modinfo_btn(mod)

})


window.addEventListener('load', () => {
    for(const i of prompt_quene){
        i()
    }
})
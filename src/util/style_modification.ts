import { ROOT_EXTRA_STYLES } from "./html_css_constants";

export function load_styles() {
    const style = document.createElement('style');
    style.innerHTML = ROOT_EXTRA_STYLES

    document.getElementsByTagName('head')[0].appendChild(style);
}
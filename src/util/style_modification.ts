export function load_styles() {
    var style = document.createElement('style');
    style.innerHTML = `\
    .infobtn { color: #0000FF; }\
    .infobtn:hover {color: #4444FF}\
    `

    document.getElementsByTagName('head')[0].appendChild(style);
}
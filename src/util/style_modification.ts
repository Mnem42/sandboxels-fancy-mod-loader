export function load_styles() {
    const style = document.createElement('style');
    style.innerHTML = `\
    .infobtn { color: #0000FF; margin-left: 5px;}\
    .infobtn:hover {color: #6666FF}\
    `

    document.getElementsByTagName('head')[0].appendChild(style);
}
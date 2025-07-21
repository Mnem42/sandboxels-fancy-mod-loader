/// Extra styles put at the level of the entire document
export const ROOT_EXTRA_STYLES = `\
    .infobtn { color: #0000FF; margin-left: 5px;}\
    .infobtn:hover {color: #6666FF}\
`

/// Base HTML to generate the mod info menu from
export const MODINFO_BASE_HTML = `
<div id="modInfo" class="menuScreen">
    <button class="XButton">-</button>
    <span id="mod_name" class="menuTitle" style="color: unset;"></span>
    <div class="menuText" style="padding-top:1em">
        <div id="promptMenuText">
            <span id="mod_version"></span>
            <br>                    
            <span id="mod_description">s</span>
        </span>
        <br><br><br>
    </div>
</div>
`

/// Placeholder CSS
export const PLACEHOLDER_CSS = `
    color: #666666;\
    font-style: italic;
`

/// Description placeholder HTML
export const MODINFO_DESCRIPTION_PLACEHOLDER = `
<span style="${PLACEHOLDER_CSS}">
    No description provided
</span>
`
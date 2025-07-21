import {Behaviour, Element, TickFn} from "../loader/elemtoml"
export {}; // Ensure this file is a module

/**
 Glue to allow `window` to be used in a typesafe way
*/
declare global {
    interface Window { 
        queuedMods: Array<string>;
        elements: {[name: string]: Element}
        behaviors: {[name: string]: Behaviour}
        enabledMods: [string]

        promptConfirm: (
            text: string, 
            handler: (was_yes: boolean) => void, 
            heading: string
        ) => void

        promptText: (
            text: string, 
            handler: () => void, 
            heading: string
        ) => void

        showModManager: () => void
    }
}

/**
 * Represents a sandboxels pixel
 *
 * @property color - Pixel colour.
 * @property element - The element that the pixel is.
 * @readonly start - The timestamp for pixel creation.
 * @property temp - The current temperature of the pixel.
 * @property x - The pixel's x coordinate.
 * @property y - The pixel's y coordinate.
 * @property tick - The function to be called on each simulation tick for this pixel.
 */
export type Pixel = {
    color: string,
    element: string,
    start: number,
    temp: number,
    x: number,
    y: number,
    tick: TickFn
}
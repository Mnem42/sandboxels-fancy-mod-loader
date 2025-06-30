import {Behaviour, Element, TickFn} from "./elemtoml"
export {}; // Ensure this file is a module

declare global {
    interface Window { 
        queuedMods: Array<string>;
        elements: {[name: string]: Element}
        behaviors: {[name: string]: Behaviour}
    }
}

export type Pixel = {
    color: string,
    element: string,
    start: number,
    temp: number,
    x: number,
    y: number,
    tick: TickFn
}
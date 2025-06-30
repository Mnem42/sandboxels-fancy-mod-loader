import "utility-types"
import toml from "@iarna/toml"
import "./glue"
import { Optional } from "utility-types"
import { Pixel } from "./glue"

export type TickFn = (pixel: Pixel) => void
export type Behaviour = [
    [string, string, string],
    [string, string, string],
    [string, string, string]
]

type _Reaction = {
    elem1: string,
    elem2: string,
    chance: number,
    tempMin: number
}

// An element
type _Element = {
    name: string,
    color: Array<string>,
    category: string,
    state: string,
    density: number,
    conduct: number,

    behavior: Behaviour,
    namedBehavior: string

    tempHigh: number,
    stateHigh: string,

    tempLow: number,
    stateLow: number,

    reactions: {[elem: string]: Reaction},
    tick: TickFn
}

// Encodes a sandboxels element
export type Element = Optional<_Element, 
    "tempHigh" | "stateHigh"      | 
    "tempLow"  | "stateLow"       |
    "density"  | "conduct"        |
    "behavior" | "namedBehavior"
>
// A reaction for a sandboxels element
export type Reaction = Optional<_Reaction, "elem2" | "chance">

export type ElementDict = {[name: string] : Element}


export function register_element(name: string, elem: Element): void{
    console.debug(
        "Element registered: ", elem,
        "Under name: ", name,
        "Named behaviour: ", 
            elem.namedBehavior, 
            window.behaviors[elem.namedBehavior as string],
    )
    console.trace()
    
    let tmp_value = elem

    console.log(tmp_value.namedBehavior)
    if (tmp_value.namedBehavior) {
        const found_behaviour = window.behaviors[tmp_value.namedBehavior]
        if (typeof found_behaviour == "function"){
            tmp_value.tick = found_behaviour
        }
        else{
            tmp_value.behavior = found_behaviour
        }
    }
    window.elements[name] = tmp_value
}

export function register_elements(elems: ElementDict): void{
    Object.entries(elems).forEach(([key, value]) => {
        register_element(key, value)
    });
}

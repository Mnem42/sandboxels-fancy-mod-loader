import "utility-types"
import toml from "@iarna/toml"
import "./glue"
import { Optional } from "utility-types"

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

    behaviour: [
        [string,string,string],
        [string,string,string],
        [string,string,string]
    ],

    tempHigh: number,
    stateHigh: string,

    tempLow: number,
    stateLow: number

    reactions: {[elem: string]: Reaction}
}

// Encodes a sandboxels element
export type Element = Optional<_Element, 
    "tempHigh" | "stateHigh" | 
    "tempLow"  | "stateLow"  |
    "density"  | "conduct"
>
// A reaction for a sandboxels element
export type Reaction = Optional<_Reaction, "elem2" | "chance">

export type ElementDict = {[name: string] : Element}

export function elems_from_obj(objs: {[name: string] : any}): ElementDict { 
    let tmp: typeof objs = {}
    Object.entries(objs).forEach(([key, value]) => {
        tmp[key] = value
    })
    return tmp

}

export function register_element(name: string, elem: Element): void{
    window.elements[name] = elem
}

export function register_elements(elems: ElementDict): void{
    Object.entries(elems).forEach(([key, value]) => {
        window.elements[key] = value;
    });
}

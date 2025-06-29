import "utility-types"
import toml from "@iarna/toml"
import "./glue"
import { Optional } from "utility-types"

type _Reaction = {
    elem1: string,
    elem2: string
}

type _Element = {
    // Element name
    name: string,
    
    // Colour (array of "#RRGGBB")
    color: Array<string>,

    // State
    state: string,

    // Behaviour
    behaviour: [
        [string,string,string],
        [string,string,string],
        [string,string,string]
    ],

    // Category
    category: string,

    tempHigh: number,
    stateHigh: string,
    density: number,
    conduct: number,

    // Reaction array
    reactions: {[elem: string]: Reaction}
}

// Encodes a sandboxels element
export type Element = Optional<_Element, "tempHigh" | "stateHigh" | "density" | "conduct">
// A reaction for a sandboxels element
export type Reaction = Optional<_Reaction, "elem2">

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

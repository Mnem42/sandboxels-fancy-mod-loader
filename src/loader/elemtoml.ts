/**
 * Module for defining elements and loading them
 */

import "utility-types"
import "../mod/glue"
import { Optional } from "utility-types"
import { Pixel } from "../mod/glue"

/**
 * A callback (as used by sandboxels for an element's `tick` callback)
 */
export type TickFn = (pixel: Pixel) => void

/**
 * A sandboxels behaviour description.
 */
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

type _Element = {
    name: string,
    color: Array<string>,
    category: string,
    state: string,
    density: number,
    conduct: number,
    movable: boolean,
    breakInto: string

    behavior: Behaviour,
    namedBehavior: string

    tempHigh: number,
    stateHigh: string,

    tempLow: number,
    stateLow: string,

    reactions: {[elem: string]: Reaction},
    tick: TickFn
}


/**
 * A representation of an element in the TOML format used
 *
 * @property name: The name of the element.
 * @property color:  An array of colours an element should have. Sandboxels randomly picks one
 * @property category: The category the element is in.
 * @property state: The state of the element (e.g., solid, liquid, gas).
 * @property density: The density of the element.
 * @property conduct: The conductivity value of the element.
 * @property breakInto: What an element breaks into
 * @property movable: Whether an element can be dragged
 * @property behavior: The behavior definition for the element.
 * @property namedBehavior: Accesses `behaviors.[name].`
 * @property tempHigh: The temperature at which the element changes to a different element (high).
 * @property stateHigh: The element to change to at `tempHigh`.
 * @property tempLow: The temperature at which the element changes to a different element (low).
 * @property stateLow: The element to change to at `tempLow`.
 * @property reactions: The list of `Reaction`s.
 * @property tick: The callback run on each tick.
 */
export type Element = Optional<_Element, 
    "tempHigh" | "stateHigh"      | 
    "tempLow"  | "stateLow"       |
    "density"  | "conduct"        |
    "behavior" | "namedBehavior"
>

/**
 * A sandboxels reaction
 *
 * @property elem1: The identifier of the first element involved in the reaction.
 * @property elem2: The identifier of the second element involved in the reaction.
 * @property chance: The probability (as a number between 0 and 1) that the reaction occurs.
 * @property tempMin: The minimum temperature required for the reaction to take place.
 */
export type Reaction = Optional<_Reaction, "elem2" | "chance">

export type ElementDict = {[name: string]: Element}

/**
 * Register an element in sandboxels
 * 
 * @param name: The element name
 * @param elem: The element object to register
 */
export function register_element(name: string, elem: Element): void{
    console.debug("Element registered: ", elem)

    let tmp_value = elem

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

/**
 * Does the same thing as `register_element`, but it operates on a dictionary
 * of elements instead of a single elements. The name is based on the keys.
 * 
 * @param elems The set of elements to register
 */
export function register_elements(elems: ElementDict): void{
    Object.entries(elems).forEach(([key, value]) => {
        register_element(key, value)
    });
}

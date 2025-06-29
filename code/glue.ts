import {Element} from "./elemtoml"
export {}; // Ensure this file is a module

declare global {
    interface Window { 
        queuedMods: Array<string>; 
        elements: {[name: string]: Element};
    }
}
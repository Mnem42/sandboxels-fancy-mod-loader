export type ParsedPackageConfig = {
    name: string
    version: string
    entry_point: string
}

export class Package{
    name: string = ""
    version: string = ""
    entry_point: string = ""

    constructor(config: ParsedPackageConfig){
        this.name = config.name
        this.version = config.version
        this.entry_point = config.entry_point
    }

    run(){
        fetch(this.entry_point)
            .then((resp) => {
                resp.text().then((x) => Function(x)())
            }) // What could *possibly* go wrong
    }
}

// What could *possibly* go wrong, indeed
export function load(object: any): ParsedPackageConfig{    
    return {
        "name": object.mod.name,
        "version": object.mod.version,
        "entry_point": object.mod.entry_point
    }
}


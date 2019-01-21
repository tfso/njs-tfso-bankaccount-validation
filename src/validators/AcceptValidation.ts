import {IValidation} from "../types"

export class AcceptValidation implements IValidation {

    constructor() {
    }

    canValidate(): Boolean {
        return true
    }

    validate() {
        return {
            valid: true
        }
    }
}
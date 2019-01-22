import {IValidation} from "../types"

export class RejectValidation implements IValidation {

    constructor() {
    }

    canValidate(): Boolean {
        return true
    }

    validate() {
        return {
            valid: false
        }
    }
}
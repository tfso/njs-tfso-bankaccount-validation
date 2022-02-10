import {IValidation, ValidationResult} from "../types"

export class AcceptValidation implements IValidation {

    constructor() {
    }

    canValidate(): Boolean {
        return true
    }

    validate(): ValidationResult {
        return {
            valid: true,
            reason: null
        }
    }
}
import {IValidation, ValidationResult} from "../types"

export class AcceptValidation implements IValidation {

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
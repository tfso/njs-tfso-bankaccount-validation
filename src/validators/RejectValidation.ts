import {IValidation, ValidationResult} from "../types"

export class RejectValidation implements IValidation {

    canValidate(): Boolean {
        return true
    }

    validate() : ValidationResult{
        return {
            valid: false,
            reason: 'Invalid'
        }
    }
}
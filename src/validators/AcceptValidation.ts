import { IValidation, ValidationResult } from '../types'

export class AcceptValidation implements IValidation {
    canValidate(): boolean {
        return true
    }

    validate(): ValidationResult {
        return {
            valid: true,
            reason: null,
        }
    }
}

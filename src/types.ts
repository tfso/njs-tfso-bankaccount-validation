export interface BankAccountValidationConfig{
    a: Boolean
}

export interface ValidationResult{
    valid: Boolean
}

export interface IValidation{
    validate(input:any): ValidationResult
    canValidate(input:any): Boolean
}

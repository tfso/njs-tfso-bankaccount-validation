export interface BankAccountValidationConfig{
    a: Boolean
}

export interface ValidationInput{
    accountNumber: string
    countryCode?: string
    type?: string
}

export interface ValidationResult{
    valid: Boolean
}

export interface IValidation{
    validate(input:any): ValidationResult
    canValidate(input:any): Boolean
}

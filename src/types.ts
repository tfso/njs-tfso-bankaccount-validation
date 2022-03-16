export interface BankAccountValidationConfig{
    acceptanceType: AcceptanceType
}

export interface ValidationInput{
    accountNumber: string
    countryCode?: string
    clearingNumber?: string | null
    type?: string
}

export interface ValidationResult{
    valid: Boolean,
    reason: string | null
}
export interface ValidationsResult{
    valid?: Boolean,
    reasons: string[]
}

export interface IValidation{
    validate(input:any): ValidationResult
    canValidate(input:any): Boolean
}
export interface IStrictValidation{
    validate(input:ValidationInput): ValidationResult
    canValidate(input:ValidationInput): Boolean
}

export enum AcceptanceType {
    some = 'some',
    all = 'all',
}

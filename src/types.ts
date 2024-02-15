export interface BankAccountValidationConfig {
    acceptanceType: AcceptanceType
}

export interface ValidationInput {
    accountNumber: string
    countryCode?: string
    clearingNumber?: string | null
    type?: string
}

export interface ValidationResult {
    valid: boolean
    reason: string | null
}
export interface ValidationsResult {
    valid?: boolean
    reasons: string[]
}

export interface IValidation {
    validate(input: any): ValidationResult
    canValidate(input: any): boolean
}
export interface IStrictValidation {
    validate(input: ValidationInput): ValidationResult
    canValidate(input: ValidationInput): boolean
}

export enum AcceptanceType {
    some = 'some',
    all = 'all',
}

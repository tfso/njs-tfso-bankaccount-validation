import * as types from "../types";
import { IStrictValidation, ValidationInput } from "../types";
import { ValidationResult } from "../types";
export declare class IbanValidation implements IStrictValidation {
    _config: types.BankAccountValidationConfig;
    private _syntaxTester;
    constructor(config: Partial<types.BankAccountValidationConfig>);
    canValidate(input: ValidationInput): Boolean;
    validate(input: ValidationInput): ValidationResult;
}

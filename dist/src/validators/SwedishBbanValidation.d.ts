import * as types from "../types";
import { IStrictValidation, ValidationInput, ValidationResult } from "../types";
export declare class SwedishBbanValidation implements IStrictValidation {
    _config: types.BankAccountValidationConfig;
    private _syntaxTester;
    constructor(config: Partial<types.BankAccountValidationConfig>);
    canValidate(input: ValidationInput): Boolean;
    validate(input: ValidationInput): ValidationResult;
}

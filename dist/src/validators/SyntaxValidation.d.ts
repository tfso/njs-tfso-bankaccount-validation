import * as types from "../types";
import { IStrictValidation, ValidationInput, ValidationResult } from "../types";
export declare class SyntaxValidation implements IStrictValidation {
    _config: types.BankAccountValidationConfig;
    constructor(config: Partial<types.BankAccountValidationConfig>);
    canValidate(): Boolean;
    validate(input: ValidationInput): ValidationResult;
}

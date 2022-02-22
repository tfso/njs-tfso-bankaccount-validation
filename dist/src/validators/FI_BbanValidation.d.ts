import * as types from "../types";
import { IStrictValidation, ValidationInput } from "../types";
export declare class FI_BbanValidation implements IStrictValidation {
    _config: types.BankAccountValidationConfig;
    private _syntaxTester;
    constructor(config: Partial<types.BankAccountValidationConfig>);
    canValidate(input: ValidationInput): Boolean;
    validate(input: ValidationInput): {
        valid: boolean;
        reason: string | null;
    };
}

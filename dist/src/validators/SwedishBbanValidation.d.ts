import * as types from "../types";
import { IValidation, ValidationInput } from "../types";
export declare class SwedishBbanValidation implements IValidation {
    _config: types.BankAccountValidationConfig;
    private _syntaxTester;
    constructor(config: Partial<types.BankAccountValidationConfig>);
    canValidate(input: string | ValidationInput): Boolean;
    validate(input: string | ValidationInput): {
        valid: boolean;
    };
    private parseBban;
    private getType;
}

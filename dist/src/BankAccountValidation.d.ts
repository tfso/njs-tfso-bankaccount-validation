import * as types from './types';
import { ValidationInput, ValidationsResult } from "./types";
export declare class BankAccountValidation {
    _config: types.BankAccountValidationConfig;
    _validationRules: (types.IValidation)[];
    constructor(config: Partial<types.BankAccountValidationConfig>);
    addStrict(validationRule: types.IStrictValidation): void;
    add(validationRule: types.IValidation): void;
    validate(input: string | ValidationInput): ValidationsResult;
}

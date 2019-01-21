import * as types from './types';
import { ValidationInput } from "./types";
export declare class BankAccountValidation {
    _config: types.BankAccountValidationConfig;
    _validationRules: types.IValidation[];
    constructor(config: Partial<types.BankAccountValidationConfig>);
    add(validationRule: types.IValidation): void;
    validate(input: string | ValidationInput): boolean;
}

import { IValidation, ValidationResult } from "../types";
export declare class RejectValidation implements IValidation {
    constructor();
    canValidate(): Boolean;
    validate(): ValidationResult;
}

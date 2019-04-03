import { IValidation, ValidationResult } from "../types";
export declare class AcceptValidation implements IValidation {
    constructor();
    canValidate(): Boolean;
    validate(): ValidationResult;
}

import { IValidation } from "../types";
export declare class AcceptValidation implements IValidation {
    constructor();
    canValidate(): Boolean;
    validate(): {
        valid: boolean;
    };
}

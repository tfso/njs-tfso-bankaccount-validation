import { IValidation } from "../types";
export declare class RejectValidation implements IValidation {
    constructor();
    canValidate(): Boolean;
    validate(): {
        valid: boolean;
    };
}

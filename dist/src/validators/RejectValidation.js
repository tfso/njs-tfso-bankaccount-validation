"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RejectValidation {
    constructor() {
    }
    canValidate() {
        return true;
    }
    validate() {
        return {
            valid: false,
            reason: 'Invalid'
        };
    }
}
exports.RejectValidation = RejectValidation;
//# sourceMappingURL=RejectValidation.js.map
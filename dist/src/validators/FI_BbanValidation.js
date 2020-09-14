"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultsDeep = require("lodash.defaultsdeep");
const defaultConfig_1 = require("../defaultConfig");
const standarizeInput_1 = require("../util/standarizeInput");
class FI_BbanValidation {
    constructor(config) {
        this._config = defaultsDeep({}, config, defaultConfig_1.default);
        this._syntaxTester = /^\d{14}$/;
    }
    canValidate(input) {
        input = standarizeInput_1.standarizeInput(input, 'none');
        return (input.type === 'bban')
            && input.countryCode === 'FI';
    }
    validate(input) {
        input = standarizeInput_1.standarizeInput(input, 'none');
        let validSyntax = this._syntaxTester.test(input.accountNumber);
        return {
            valid: validSyntax,
            reason: !validSyntax ? 'Number does not contain 14 digits' : null
        };
    }
}
exports.FI_BbanValidation = FI_BbanValidation;
//# sourceMappingURL=FI_BbanValidation.js.map
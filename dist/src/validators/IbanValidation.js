"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IbanValidation = void 0;
const defaultsDeep = require("lodash.defaultsdeep");
const defaultConfig_1 = require("../defaultConfig");
const standarizeInput_1 = require("../util/standarizeInput");
const ibantools = require("ibantools");
class IbanValidation {
    _config;
    _syntaxTester;
    constructor(config) {
        this._config = defaultsDeep({}, config, defaultConfig_1.default);
        this._syntaxTester = /^[A-Z]{2}\d{2}.*$/;
    }
    canValidate(input) {
        input = (0, standarizeInput_1.standarizeInput)(input, 'none');
        if (input.type === 'iban') {
            return true;
        }
        return input.type === 'none' && this._syntaxTester.test(input.accountNumber);
    }
    validate(input) {
        input = (0, standarizeInput_1.standarizeInput)(input, 'none');
        let isValid = ibantools.isValidIBAN(input.accountNumber);
        return {
            valid: isValid,
            reason: isValid ? null : 'Invalid iban'
        };
    }
}
exports.IbanValidation = IbanValidation;
//# sourceMappingURL=IbanValidation.js.map
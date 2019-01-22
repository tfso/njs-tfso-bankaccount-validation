"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultsDeep = require("lodash.defaultsdeep");
const defaultConfig_1 = require("../defaultConfig");
const standarizeInput_1 = require("../util/standarizeInput");
const ibantools = require("ibantools");
class IbanValidation {
    constructor(config) {
        this._config = defaultsDeep({}, config, defaultConfig_1.default);
        this._syntaxTester = /^[A-Z]{2}\d{2}.*$/;
    }
    canValidate(input) {
        input = standarizeInput_1.standarizeInput(input, 'none');
        if (input.type === 'iban') {
            return true;
        }
        return input.type === 'none' && this._syntaxTester.test(input.accountNumber);
    }
    validate(input) {
        input = standarizeInput_1.standarizeInput(input, 'none');
        return {
            valid: ibantools.isValidIBAN(input.accountNumber)
        };
    }
}
exports.IbanValidation = IbanValidation;
//# sourceMappingURL=IbanValidation.js.map
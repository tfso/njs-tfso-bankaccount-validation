"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultConfig_1 = require("./defaultConfig");
const ibantools = require("ibantools");
const standarizeInput_1 = require("./util/standarizeInput");
const defaultsDeep = require("lodash.defaultsdeep");
class IbanValidation {
    constructor(config) {
        this._config = defaultsDeep({}, config, defaultConfig_1.default);
        this._validationRules = [];
        this._ibanTester = /^[A-Z]{2}.*$/;
    }
    canValidate(input) {
        input = standarizeInput_1.standarizeInput(input);
        return input && this._ibanTester.test(input.accountNumber);
    }
    validate(input) {
        input = standarizeInput_1.standarizeInput(input);
        return {
            valid: ibantools.isValidIBAN(input.accountNumber)
        };
    }
}
exports.IbanValidation = IbanValidation;
//# sourceMappingURL=IbanValidation.js.map
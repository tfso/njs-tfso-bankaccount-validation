"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultsDeep = require("lodash.defaultsdeep");
const defaultConfig_1 = require("../defaultConfig");
const standarizeInput_1 = require("../util/standarizeInput");
// import * as checkdigit from 'checkdigit'
const modulusCalculation_1 = require("../util/modulusCalculation");
class NorwegianBbanValidation {
    constructor(config) {
        this._config = defaultsDeep({}, config, defaultConfig_1.default);
        this._syntaxTester = /^\d{11}$/;
    }
    canValidate(input) {
        input = standarizeInput_1.standarizeInput(input);
        return (!input.type || input.type === 'bban')
            && input.countryCode === 'NO';
    }
    validate(input) {
        input = standarizeInput_1.standarizeInput(input);
        return {
            valid: this._syntaxTester.test(input.accountNumber) &&
                norMod11(input.accountNumber)
        };
    }
}
exports.NorwegianBbanValidation = NorwegianBbanValidation;
function norMod11(number) {
    let sum = modulusCalculation_1.calculate(number, [5, 4, 3, 2, 7, 6, 5, 4, 3, 2, 1]);
    return modulusCalculation_1.modulusValidation(sum, 11);
}
//# sourceMappingURL=NorwegianBbanValidation.js.map
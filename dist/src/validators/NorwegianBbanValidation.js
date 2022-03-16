"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NorwegianBbanValidation = void 0;
const defaultsDeep = require("lodash.defaultsdeep");
const defaultConfig_1 = require("../defaultConfig");
const standarizeInput_1 = require("../util/standarizeInput");
// import * as checkdigit from 'checkdigit'
const modulusCalculation_1 = require("../util/modulusCalculation");
class NorwegianBbanValidation {
    _config;
    _syntaxTester;
    constructor(config) {
        this._config = defaultsDeep({}, config, defaultConfig_1.default);
        this._syntaxTester = /^\d{11}$/;
    }
    canValidate(input) {
        input = (0, standarizeInput_1.standarizeInput)(input, 'none');
        return (input.type === 'bban')
            && input.countryCode === 'NO';
    }
    validate(input) {
        input = (0, standarizeInput_1.standarizeInput)(input, 'none');
        const validSyntax = this._syntaxTester.test(input.accountNumber);
        const validModCheck = norMod11(input.accountNumber);
        return {
            valid: validSyntax &&
                validModCheck,
            reason: !validSyntax ? 'Number does not contain 11 digits' :
                !validModCheck ? 'Account number does not pass the sum check' : null
        };
    }
}
exports.NorwegianBbanValidation = NorwegianBbanValidation;
function norMod11(number) {
    const sum = (0, modulusCalculation_1.calculate)(number, [5, 4, 3, 2, 7, 6, 5, 4, 3, 2, 1]);
    return (0, modulusCalculation_1.modulusValidation)(sum, 11);
}
//# sourceMappingURL=NorwegianBbanValidation.js.map
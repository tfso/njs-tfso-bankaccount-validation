"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultsDeep = require("lodash.defaultsdeep");
const defaultConfig_1 = require("../defaultConfig");
const standarizeInput_1 = require("../util/standarizeInput");
const modulusCalculation_1 = require("../util/modulusCalculation");
class SwedishBankgiroValidation {
    constructor(config) {
        this._config = defaultsDeep({}, config, defaultConfig_1.default);
        this._syntaxTester = /^\d{3,4}-\d{4}$/;
    }
    canValidate(input) {
        return (input.type === 'bankgiro');
    }
    validate(input) {
        input = standarizeInput_1.standarizeInput(input, 'none');
        if (input.countryCode !== 'SE') {
            return {
                valid: false,
                reason: `Bank giro account type require country code to be SE. Received: ${input.countryCode}`
            };
        }
        let validSyntax = this._syntaxTester.test(input.accountNumber);
        let validModCheck = sweMod10(input.accountNumber.replace('-', ''));
        return {
            valid: validSyntax &&
                validModCheck,
            reason: !validSyntax ? 'Account number does not match the Swedish bank giro format. Valid format is "XX(X)-XXXX"' :
                !validModCheck ? 'Account number does not pass the sum check' : null
        };
    }
}
exports.SwedishBankgiroValidation = SwedishBankgiroValidation;
function sweMod10(number) {
    let sum = modulusCalculation_1.calculate(number, [2, 1], (n) => n > 9 ? n - 9 : n);
    return modulusCalculation_1.modulusValidation(sum, 10);
}
//# sourceMappingURL=SwedishBankgiroValidation.js.map
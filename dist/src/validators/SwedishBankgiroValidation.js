"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultsDeep = require("lodash.defaultsdeep");
const defaultConfig_1 = require("../defaultConfig");
const standarizeInput_1 = require("../util/standarizeInput");
class SwedishBankgiroValidation {
    constructor(config) {
        this._config = defaultsDeep({}, config, defaultConfig_1.default);
        this._syntaxTester = /^\d{3,4}-\d{4}$/;
    }
    canValidate(input) {
        input = standarizeInput_1.standarizeInput(input, 'none');
        return (input.type === 'bankgiro')
            && input.countryCode === 'SE';
    }
    validate(input) {
        input = standarizeInput_1.standarizeInput(input, 'none');
        return {
            valid: this._syntaxTester.test(input.accountNumber)
        };
    }
}
exports.SwedishBankgiroValidation = SwedishBankgiroValidation;
//# sourceMappingURL=SwedishBankgiroValidation.js.map
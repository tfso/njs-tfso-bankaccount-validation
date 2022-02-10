"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PL_BbanValidation = void 0;
const defaultsDeep = require("lodash.defaultsdeep");
const defaultConfig_1 = require("../defaultConfig");
const standarizeInput_1 = require("../util/standarizeInput");
class PL_BbanValidation {
    _config;
    _syntaxTester;
    constructor(config) {
        this._config = defaultsDeep({}, config, defaultConfig_1.default);
        this._syntaxTester = /^\d{24}$/;
    }
    canValidate(input) {
        input = (0, standarizeInput_1.standarizeInput)(input, 'none');
        return (input.type === 'bban')
            && input.countryCode === 'PL';
    }
    validate(input) {
        input = (0, standarizeInput_1.standarizeInput)(input, 'none');
        let validSyntax = this._syntaxTester.test(input.accountNumber);
        return {
            valid: validSyntax,
            reason: !validSyntax ? 'Number does not contain 24 digits' : null
        };
    }
}
exports.PL_BbanValidation = PL_BbanValidation;
//# sourceMappingURL=PL_BbanValidation.js.map
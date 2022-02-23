"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DanishBbanValidation = void 0;
const defaultsDeep = require("lodash.defaultsdeep");
const defaultConfig_1 = require("../defaultConfig");
const standarizeInput_1 = require("../util/standarizeInput");
class DanishBbanValidation {
    _config;
    _syntaxTester;
    constructor(config) {
        this._config = defaultsDeep({}, config, defaultConfig_1.default);
        this._syntaxTester = /^\d{14}$/;
    }
    canValidate(input) {
        input = (0, standarizeInput_1.standarizeInput)(input, 'none');
        return (input.type === 'bban')
            && input.countryCode === 'DK';
    }
    validate(input) {
        input = (0, standarizeInput_1.standarizeInput)(input, 'none');
        const validSyntax = this._syntaxTester.test(input.accountNumber);
        return {
            valid: validSyntax,
            reason: !validSyntax ? 'Number does not contain 14 digits' : null
        };
    }
}
exports.DanishBbanValidation = DanishBbanValidation;
//# sourceMappingURL=DanishBbanValidation.js.map
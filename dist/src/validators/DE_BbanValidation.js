"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DE_BbanValidation = void 0;
const defaultsDeep = require("lodash.defaultsdeep");
const defaultConfig_1 = require("../defaultConfig");
const standarizeInput_1 = require("../util/standarizeInput");
class DE_BbanValidation {
    _config;
    _syntaxTester;
    constructor(config) {
        this._config = defaultsDeep({}, config, defaultConfig_1.default);
        this._syntaxTester = /^\d{18}$/;
    }
    canValidate(input) {
        input = (0, standarizeInput_1.standarizeInput)(input, 'none');
        return (input.type === 'bban')
            && input.countryCode === 'DE';
    }
    validate(input) {
        input = (0, standarizeInput_1.standarizeInput)(input, 'none');
        const validSyntax = this._syntaxTester.test(input.accountNumber);
        return {
            valid: validSyntax,
            reason: !validSyntax ? 'Number does not contain 18 digits' : null
        };
    }
}
exports.DE_BbanValidation = DE_BbanValidation;
//# sourceMappingURL=DE_BbanValidation.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultsDeep = require("lodash.defaultsdeep");
const defaultConfig_1 = require("../defaultConfig");
const standarizeInput_1 = require("../util/standarizeInput");
class SwedishPlusgiroValidation {
    constructor(config) {
        this._config = defaultsDeep({}, config, defaultConfig_1.default);
        this._syntaxTester = /^(\d{1,7})-\d$/;
    }
    canValidate(input) {
        input = standarizeInput_1.standarizeInput(input, 'none');
        return (input.type === 'plusgiro')
            && input.countryCode === 'SE';
    }
    validate(input) {
        input = standarizeInput_1.standarizeInput(input, 'none');
        return {
            valid: this._syntaxTester.test(input.accountNumber)
        };
    }
}
exports.SwedishPlusgiroValidation = SwedishPlusgiroValidation;
//# sourceMappingURL=SwedishPlusgiroValidation.js.map
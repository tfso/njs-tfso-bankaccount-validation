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
        return (input.type === 'plusgiro');
    }
    validate(input) {
        input = standarizeInput_1.standarizeInput(input, 'none');
        if (input.countryCode !== 'SE') {
            return {
                valid: false,
                reason: `Plus giro account type require country code to be SE. Received: ${input.countryCode}`
            };
        }
        let isValid = this._syntaxTester.test(input.accountNumber);
        return {
            valid: isValid,
            reason: isValid ? null : 'Number does not match the Swedish plus giro syntax'
        };
    }
}
exports.SwedishPlusgiroValidation = SwedishPlusgiroValidation;
//# sourceMappingURL=SwedishPlusgiroValidation.js.map
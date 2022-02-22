"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxValidation = void 0;
const defaultsDeep = require("lodash.defaultsdeep");
const defaultConfig_1 = require("../defaultConfig");
const standarizeInput_1 = require("../util/standarizeInput");
class SyntaxValidation {
    _config;
    constructor(config) {
        this._config = defaultsDeep({}, config, defaultConfig_1.default);
    }
    canValidate() {
        return true;
    }
    validate(input) {
        input = (0, standarizeInput_1.standarizeInput)(input, 'none');
        const isValid = input.type === 'none';
        return {
            valid: isValid,
            reason: isValid ? null : `invalid syntax for type: '${input.type}'`
        };
    }
}
exports.SyntaxValidation = SyntaxValidation;
//# sourceMappingURL=SyntaxValidation.js.map
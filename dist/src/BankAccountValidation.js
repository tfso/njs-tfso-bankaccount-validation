"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultsDeep = require("lodash.defaultsdeep");
const defaultConfig_1 = require("./defaultConfig");
class BankAccountValidation {
    constructor(config) {
        this._config = defaultsDeep({}, config, defaultConfig_1.default);
        this._validationRules = [];
    }
    add(validationRule) {
        this._validationRules.push(validationRule);
    }
    validate(input) {
        return this._validationRules
            .filter(validationRule => {
            return validationRule.canValidate(input);
        })
            .map(validationRule => {
            return validationRule.validate(input);
        });
    }
}
exports.BankAccountValidation = BankAccountValidation;
//# sourceMappingURL=BankAccountValidation.js.map
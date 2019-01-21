"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultsDeep = require("lodash.defaultsdeep");
const defaultConfig_1 = require("./defaultConfig");
const types_1 = require("./types");
class BankAccountValidation {
    constructor(config) {
        this._config = defaultsDeep({}, config, defaultConfig_1.default);
        this._validationRules = [];
    }
    add(validationRule) {
        this._validationRules.push(validationRule);
    }
    validate(input) {
        let validationResults = this._validationRules
            .filter(validationRule => {
            return validationRule.canValidate(input);
        })
            .map(validationRule => {
            return validationRule.validate(input);
        });
        if (this._config.acceptanceType === types_1.AcceptanceType.someAccept) {
            return validationResults.some(result => result.valid === true);
        }
        if (this._config.acceptanceType === types_1.AcceptanceType.allAccept) {
            return validationResults.every(result => result.valid === true);
        }
        throw Error('Error when validating');
    }
}
exports.BankAccountValidation = BankAccountValidation;
//# sourceMappingURL=BankAccountValidation.js.map
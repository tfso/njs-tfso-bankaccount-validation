"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultsDeep = require("lodash.defaultsdeep");
const defaultConfig_1 = require("./defaultConfig");
const types_1 = require("./types");
const standarizeInput_1 = require("./util/standarizeInput");
class StrictValidationWrapper {
    constructor(strictValidation) {
        this._strictValidation = strictValidation;
    }
    canValidate(input) {
        return this._strictValidation.canValidate(standarizeInput_1.standarizeInput(input, 'none'));
    }
    validate(input) {
        return this._strictValidation.validate(standarizeInput_1.standarizeInput(input, 'none'));
    }
}
class BankAccountValidation {
    constructor(config) {
        this._config = defaultsDeep({}, config, defaultConfig_1.default);
        this._validationRules = [];
    }
    addStrict(validationRule) {
        this._validationRules.push(new StrictValidationWrapper(validationRule));
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
        let validResults = validationResults.filter(result => result.valid === true);
        if (validationResults.length === 0) {
            return {
                valid: undefined,
                reasons: []
            };
        }
        // @ts-ignore
        let reasons = validResults
            .filter(result => !result.valid)
            .map(result => result.reason);
        if (this._config.acceptanceType === types_1.AcceptanceType.some) {
            return {
                valid: validResults.length > 0,
                reasons
            };
        }
        if (this._config.acceptanceType === types_1.AcceptanceType.all) {
            return {
                valid: validResults.length === validationResults.length,
                reasons
            };
        }
        return {
            valid: undefined,
            reasons: []
        };
    }
}
exports.BankAccountValidation = BankAccountValidation;
//# sourceMappingURL=BankAccountValidation.js.map
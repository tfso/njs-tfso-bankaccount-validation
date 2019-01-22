"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultsDeep = require("lodash.defaultsdeep");
const defaultConfig_1 = require("../defaultConfig");
const swedishBanks_1 = require("../util/swedishBanks");
const standarizeInput_1 = require("../util/standarizeInput");
const modulusCalculation_1 = require("../util/modulusCalculation");
class SwedishBbanValidation {
    constructor(config) {
        this._config = defaultsDeep({}, config, defaultConfig_1.default);
        /* syntax: clearing (4 digit) + account number (7, 9 or 10 digit) */
        this._syntaxTester = /^\d{4}(:?\d{7}|\d{9}|\d{10})$/;
    }
    canValidate(input) {
        input = standarizeInput_1.standarizeInput(input, 'none');
        return (input.type === 'bban')
            && input.countryCode === 'SE';
    }
    validate(input) {
        input = standarizeInput_1.standarizeInput(input, 'none');
        let bban = input.accountNumber;
        let valid = this._syntaxTester.test(bban);
        if (!valid) {
            return { valid: false };
        }
        let account = this.parseBban(bban);
        if (account.type === '1.1' && account.length === 7 && sweMod11(account.bban.substr(1)) ||
            account.type === '1.2' && account.length === 7 && sweMod11(account.bban) ||
            account.type === '2.1' && account.length === 10 && sweMod10(account.accountNumber) ||
            account.type === '2.2' && account.length === 9 && sweMod11(account.accountNumber) ||
            account.type === '2.3' && account.length === 10 && sweMod10(account.accountNumber)) {
            return { valid: true };
        }
        return { valid: false };
    }
    parseBban(bban) {
        let clearing = parseInt(bban.substr(0, 4));
        let accountNumber = bban.substr(4);
        let type = this.getType(clearing);
        return {
            clearing,
            accountNumber,
            bban,
            type,
            length: accountNumber.length
        };
    }
    getType(clearingNumber) {
        let banks = swedishBanks_1.swedishBanks.filter(bank => {
            return bank.clearingFrom <= clearingNumber && clearingNumber <= bank.clearingTo;
        });
        if (banks.length !== 1) {
            return '0.0';
        }
        let bank = banks[0];
        return bank.type + '.' + bank.comment;
    }
}
exports.SwedishBbanValidation = SwedishBbanValidation;
function sweMod10(number) {
    let sum = modulusCalculation_1.calculate(number, [2, 1], (n) => n > 9 ? n - 9 : n);
    return modulusCalculation_1.modulusValidation(sum, 10);
}
function sweMod11(number) {
    let sum = modulusCalculation_1.calculate(number, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
    return modulusCalculation_1.modulusValidation(sum, 11);
}
//# sourceMappingURL=SwedishBbanValidation.js.map
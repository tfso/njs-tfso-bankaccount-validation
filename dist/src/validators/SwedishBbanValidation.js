"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwedishBbanValidation = void 0;
const defaultsDeep = require("lodash.defaultsdeep");
const defaultConfig_1 = require("../defaultConfig");
const swedishBanks_1 = require("../util/swedishBanks");
const standarizeInput_1 = require("../util/standarizeInput");
const modulusCalculation_1 = require("../util/modulusCalculation");
class SwedishBbanValidation {
    _config;
    _syntaxTester;
    constructor(config) {
        this._config = defaultsDeep({}, config, defaultConfig_1.default);
        /* syntax: optional clearing (4 digit) + account number (7, 9 or 10 digit)*/
        this._syntaxTester = /^(\d{4}(:?\d{7}|\d{9}|\d{10})|(:?\d{7}|\d{9}|\d{10}))$/;
    }
    canValidate(input) {
        input = (0, standarizeInput_1.standarizeInput)(input, 'none');
        return (input.type === 'bban')
            && input.countryCode === 'SE';
    }
    validate(input) {
        input = (0, standarizeInput_1.standarizeInput)(input, 'none');
        const account = this.parseClearingAndAccountNumber(input.clearingNumber || null, input.accountNumber);
        const validSyntax = this._syntaxTester.test(account.bban);
        if (!validSyntax) {
            return {
                valid: false,
                reason: 'Invalid swedish syntax. Number must be 11, 13 or 14 digits long (incl clearing number)'
            };
        }
        if (account.type === '1.1' && account.length === 7 && sweMod11(account.bban.substr(1)) ||
            account.type === '1.2' && account.length === 7 && sweMod11(account.bban) ||
            account.type === '2.1' && account.length === 10 && sweMod10(account.accountNumber) ||
            account.type === '2.2' && account.length === 9 && sweMod11(account.accountNumber) ||
            account.type === '2.3' && account.length === 10 && sweMod10(account.accountNumber)) {
            return {
                valid: true,
                reason: null
            };
        }
        return {
            valid: false,
            reason: 'Invalid Swedish bban'
        };
    }
    parseClearingAndAccountNumber(_clearing, bban) {
        // swedbank used 5 chars in clearing, remove the last one (always a 9-er!?)
        const clearing = _clearing ? parseInt(_clearing) : parseInt(bban.substr(0, 4));
        const accountNumber = _clearing ? bban : bban.substr(4);
        const type = this.getType(clearing);
        return {
            clearing,
            accountNumber,
            bban: [clearing, accountNumber].join(''),
            type,
            length: accountNumber.length
        };
    }
    getType(clearingNumber) {
        const banks = swedishBanks_1.swedishBanks.filter(bank => {
            return bank.clearingFrom <= clearingNumber && clearingNumber <= bank.clearingTo;
        });
        if (banks.length !== 1) {
            return '0.0';
        }
        const bank = banks[0];
        return bank.type + '.' + bank.comment;
    }
}
exports.SwedishBbanValidation = SwedishBbanValidation;
function sweMod10(number) {
    const sum = (0, modulusCalculation_1.calculate)(number, [2, 1], (n) => n > 9 ? n - 9 : n);
    return (0, modulusCalculation_1.modulusValidation)(sum, 10);
}
function sweMod11(number) {
    const sum = (0, modulusCalculation_1.calculate)(number, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
    return (0, modulusCalculation_1.modulusValidation)(sum, 11);
}
//# sourceMappingURL=SwedishBbanValidation.js.map
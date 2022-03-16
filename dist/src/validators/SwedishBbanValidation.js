"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwedishBbanValidation = void 0;
const defaultsDeep = require("lodash.defaultsdeep");
const defaultConfig_1 = require("../defaultConfig");
const swedishBanks_1 = require("../util/swedishBanks");
const standarizeInput_1 = require("../util/standarizeInput");
const modulusCalculation_1 = require("../util/modulusCalculation");
function extractClearingNumber(_clearing, bban) {
    return _clearing ? parseInt(_clearing) : parseInt(bban.substr(0, 4));
}
function extractAccountNumberOnly(_clearing, bban) {
    return _clearing ? bban : bban.substr(4);
}
function getType(clearingNumber) {
    const banks = swedishBanks_1.swedishBanks.filter(bank => {
        return bank.clearingFrom <= clearingNumber && clearingNumber <= bank.clearingTo;
    });
    if (banks.length !== 1) {
        return '0.0';
    }
    const bank = banks[0];
    return bank.type + '.' + bank.comment;
}
function createBbanInclClearingNumber(clearing, accountNumber) {
    return [clearing, accountNumber].join('');
}
/**
 * clearing number might be set separate or included in the bban as the 4 first digits.
 * This function extract these values in two separate fields in addition to a joint field
 * called accountNumber with both fields.
 * @param _clearing
 * @param bban
 */
function parseClearingAndAccountNumber(_clearing, bban) {
    // swedbank used 5 chars in clearing, remove the last one (always a 9-er!?)
    const clearing = extractClearingNumber(_clearing, bban);
    const accountNumber = extractAccountNumberOnly(_clearing, bban);
    return {
        clearing,
        accountNumber,
        bban: createBbanInclClearingNumber(clearing, accountNumber),
        type: getType(clearing),
        length: accountNumber.length
    };
}
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
        // Bypass validation if clearing number is specified. This is because the rules
        // with all its edge cases was hard to implement. This exception should be reviewed
        // and removed at a later stage when we get control of all the edge cases.
        // Currently 5 digit clearing numbers is not supported
        if (input.clearingNumber) {
            return {
                valid: true,
                reason: null
            };
        }
        const account = parseClearingAndAccountNumber(input.clearingNumber || null, input.accountNumber);
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
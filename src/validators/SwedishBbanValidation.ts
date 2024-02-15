import defaultsDeep = require('lodash.defaultsdeep')
import * as types from '../types'
import { IStrictValidation, ValidationInput, ValidationResult } from '../types'
import defaultConfig from '../defaultConfig'
import { swedishBanks } from '../util/swedishBanks'
import { standarizeInput } from '../util/standarizeInput'
import { calculate, modulusValidation } from '../util/modulusCalculation'

interface Account {
    clearing: number
    accountNumber: string
    bban: string
    type: string
    length: number
}

function extractClearingNumber(_clearing: string | null, bban: string) {
    return _clearing ? parseInt(_clearing) : parseInt(bban.slice(0, 4))
}

function extractAccountNumberOnly(_clearing: string | null, bban: string) {
    return _clearing ? bban : bban.slice(4)
}

function getType(clearingNumber: number): string {
    const banks = swedishBanks.filter((bank) => {
        return (
            bank.clearingFrom <= clearingNumber &&
            clearingNumber <= bank.clearingTo
        )
    })

    if (banks.length !== 1) {
        return '0.0'
    }

    const bank = banks[0]

    return bank.type + '.' + bank.comment
}

function createBbanInclClearingNumber(clearing: number, accountNumber: string) {
    return [clearing, accountNumber].join('')
}

/**
 * clearing number might be set separate or included in the bban as the 4 first digits.
 * This function extract these values in two separate fields in addition to a joint field
 * called accountNumber with both fields.
 * @param _clearing
 * @param bban
 */
function parseClearingAndAccountNumber(
    _clearing: string | null,
    bban: string
): Account {
    // swedbank used 5 chars in clearing, remove the last one (always a 9-er!?)
    const clearing = extractClearingNumber(_clearing, bban)
    const accountNumber = extractAccountNumberOnly(_clearing, bban)

    return {
        clearing,
        accountNumber,
        bban: createBbanInclClearingNumber(clearing, accountNumber),
        type: getType(clearing),
        length: accountNumber.length,
    }
}

export class SwedishBbanValidation implements IStrictValidation {
    _config: types.BankAccountValidationConfig
    private _syntaxTester: RegExp
    private _syntaxTesterSwedbank: RegExp

    constructor(config: Partial<types.BankAccountValidationConfig>) {
        this._config = defaultsDeep({}, config, defaultConfig)
        /* syntax: optional clearing (4 digit) + account number (7, 9 or 10 digit)*/
        this._syntaxTester =
            /^(\d{4}(:?\d{7}|\d{9}|\d{10})|(:?\d{7}|\d{9}|\d{10}))$/
        /* syntax: 5 digit clearing starting with 8 + nolla + account number 9 digit */
        this._syntaxTesterSwedbank = /^8\d{4}0\d{9}$/
    }

    canValidate(input: ValidationInput): boolean {
        input = standarizeInput(input, 'none')

        return input.type === 'bban' && input.countryCode === 'SE'
    }

    validate(input: ValidationInput): ValidationResult {
        input = standarizeInput(input, 'none')

        // Bypass validation if clearing number is specified. This is because the rules
        // with all its edge cases was hard to implement. This exception should be reviewed
        // and removed at a later stage when we get control of all the edge cases.
        // Currently 5 digit clearing numbers is not supported
        if (input.clearingNumber) {
            return {
                valid: true,
                reason: null,
            }
        }

        const account = parseClearingAndAccountNumber(
            input.clearingNumber || null,
            input.accountNumber
        )

        const validSyntax =
            this._syntaxTester.test(account.bban) ||
            this._syntaxTesterSwedbank.test(account.bban)

        if (!validSyntax) {
            return {
                valid: false,
                reason: 'Invalid swedish syntax. Number must be 11, 13 or 14 digits long (incl clearing number)',
            }
        }

        if (
            (account.type === '1.1' &&
                account.length === 7 &&
                sweMod11(account.bban.slice(1))) ||
            (account.type === '1.2' &&
                account.length === 7 &&
                sweMod11(account.bban)) ||
            (account.type === '2.1' &&
                account.length === 10 &&
                sweMod10(account.accountNumber)) ||
            (account.type === '2.2' &&
                account.length === 9 &&
                sweMod11(account.accountNumber)) ||
            (account.type === '2.3' &&
                account.length === 10 &&
                sweMod10(account.accountNumber)) ||
            // supporting 5 digit clearing number - Swedbank
            (account.type === '2.3' &&
                account.length === 11 &&
                sweMod10(account.accountNumber.slice(-10)))
        ) {
            return {
                valid: true,
                reason: null,
            }
        }

        return {
            valid: false,
            reason: 'Invalid Swedish bban',
        }
    }
}

function sweMod10(number: string) {
    const sum = calculate(number, [2, 1], (n: any) => (n > 9 ? n - 9 : n))
    return modulusValidation(sum, 10)
}

function sweMod11(number: string) {
    const sum = calculate(number, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
    return modulusValidation(sum, 11)
}

import defaultsDeep = require('lodash.defaultsdeep')
import * as types from "../types"
import {IStrictValidation, ValidationInput} from "../types"
import defaultConfig from "../defaultConfig"
import {standarizeInput} from "../util/standarizeInput"
// import * as checkdigit from 'checkdigit'
import {calculate, modulusValidation} from '../util/modulusCalculation'

export class NorwegianBbanValidation implements IStrictValidation {
    _config: types.BankAccountValidationConfig
    private _syntaxTester: RegExp

    constructor(config: Partial<types.BankAccountValidationConfig>) {
        this._config = defaultsDeep({}, config, defaultConfig)
        this._syntaxTester = /^\d{11}$/
    }

    canValidate(input: ValidationInput): Boolean {
        input = standarizeInput(input, 'none')

        return (input.type === 'bban')
            && input.countryCode === 'NO'
    }

    validate(input: ValidationInput) {
        input = standarizeInput(input, 'none')

        const validSyntax = this._syntaxTester.test(input.accountNumber)
        const validModCheck = norMod11(input.accountNumber)
        return {
            valid: validSyntax &&
                validModCheck,
            reason: !validSyntax ? 'Number does not contain 11 digits' :
                !validModCheck ? 'Account number does not pass the sum check': null
        }
    }
}
function norMod11(number:string){
    const sum = calculate(number, [5, 4, 3, 2, 7, 6, 5, 4, 3, 2, 1])
    return modulusValidation(sum, 11)
}
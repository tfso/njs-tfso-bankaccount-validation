import defaultsDeep = require('lodash.defaultsdeep')
import * as types from "../types"
import {IValidation, ValidationInput} from "../types"
import defaultConfig from "../defaultConfig"
import {standarizeInput} from "../util/standarizeInput"
// import * as mod11 from 'checkdigit'

export class NorwegianBbanValidation implements IValidation {
    _config: types.BankAccountValidationConfig
    private _syntaxTester: RegExp

    constructor(config: Partial<types.BankAccountValidationConfig>) {
        this._config = defaultsDeep({}, config, defaultConfig)
        this._syntaxTester = /^\d{11}.*$/
    }

    canValidate(input: string | ValidationInput): Boolean {
        input = standarizeInput(input)

        if (input.type && input.type!=='bban'){
            return false
        }

        return input.countryCode === 'NO'
    }

    validate(input: string | ValidationInput) {
        input = standarizeInput(input)

        return {
            valid: this._syntaxTester.test(input.accountNumber)
                // &&
                // mod11.isValid(input.accountNumber)
        }
    }
}
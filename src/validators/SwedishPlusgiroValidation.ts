import defaultsDeep = require('lodash.defaultsdeep')
import * as types from "../types"
import {IValidation, ValidationInput} from "../types"
import defaultConfig from "../defaultConfig"
import {standarizeInput} from "../util/standarizeInput"

export class SwedishPlusgiroValidation implements IValidation {
    _config: types.BankAccountValidationConfig
    private _syntaxTester: RegExp

    constructor(config: Partial<types.BankAccountValidationConfig>) {
        this._config = defaultsDeep({}, config, defaultConfig)
        this._syntaxTester = /^(\d{1,7})-\d$/
    }

    canValidate(input: string | ValidationInput): Boolean {
        input = standarizeInput(input, 'none')

        return (input.type === 'plusgiro')
            && input.countryCode === 'SE'
    }

    validate(input: string | ValidationInput) {
        input = standarizeInput(input, 'none')

        return {
            valid: this._syntaxTester.test(input.accountNumber)
        }
    }
}
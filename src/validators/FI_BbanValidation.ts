import defaultsDeep = require('lodash.defaultsdeep')
import * as types from '../types'
import { IStrictValidation, ValidationInput } from '../types'
import defaultConfig from '../defaultConfig'
import { standarizeInput } from '../util/standarizeInput'

export class FI_BbanValidation implements IStrictValidation {
    _config: types.BankAccountValidationConfig
    private _syntaxTester: RegExp

    constructor(config: Partial<types.BankAccountValidationConfig>) {
        this._config = defaultsDeep({}, config, defaultConfig)
        this._syntaxTester = /^\d{14}$/
    }

    canValidate(input: ValidationInput): boolean {
        input = standarizeInput(input, 'none')

        return input.type === 'bban' && input.countryCode === 'FI'
    }

    validate(input: ValidationInput) {
        input = standarizeInput(input, 'none')

        const validSyntax = this._syntaxTester.test(input.accountNumber)
        return {
            valid: validSyntax,
            reason: !validSyntax ? 'Number does not contain 14 digits' : null,
        }
    }
}

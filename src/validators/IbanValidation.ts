import defaultsDeep = require('lodash.defaultsdeep')
import * as types from "../types"
import {IValidation, ValidationInput} from "../types"
import defaultConfig from "../defaultConfig"
import {standarizeInput} from "../util/standarizeInput"
import * as ibantools from "ibantools"

export class IbanValidation implements IValidation {
    _config: types.BankAccountValidationConfig
    private _syntaxTester: RegExp

    constructor(config: Partial<types.BankAccountValidationConfig>) {
        this._config = defaultsDeep({}, config, defaultConfig)
        this._syntaxTester = /^[A-Z]{2}\d{2}.*$/
    }

    canValidate(input: string | ValidationInput): Boolean {
        input = standarizeInput(input)

        return (!input.type || input.type === 'iban')
            && this._syntaxTester.test(input.accountNumber)
    }

    validate(input: string | ValidationInput) {
        input = standarizeInput(input)

        return {
            valid: ibantools.isValidIBAN(input.accountNumber)
        }
    }
}
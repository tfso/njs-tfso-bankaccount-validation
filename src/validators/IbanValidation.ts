import defaultsDeep = require('lodash.defaultsdeep')
import * as types from "../types"
import {IStrictValidation, ValidationInput} from "../types"
import defaultConfig from "../defaultConfig"
import {standarizeInput} from "../util/standarizeInput"
import * as ibantools from "ibantools"
import {ValidationResult} from "../types"

export class IbanValidation implements IStrictValidation {
    _config: types.BankAccountValidationConfig
    private _syntaxTester: RegExp

    constructor(config: Partial<types.BankAccountValidationConfig>) {
        this._config = defaultsDeep({}, config, defaultConfig)
        this._syntaxTester = /^[A-Z]{2}\d{2}.*$/
    }

    canValidate(input: ValidationInput): Boolean {
        input = standarizeInput(input, 'none')

        if (input.type === 'iban'){
            return true
        }

        return input.type === 'none' && this._syntaxTester.test(input.accountNumber)
    }

    validate(input: ValidationInput) : ValidationResult {
        input = standarizeInput(input, 'none')

        let isValid = ibantools.isValidIBAN(input.accountNumber)
        return {
            valid: isValid,
            reason: isValid ? null : 'Invalid iban'
        }
    }
}
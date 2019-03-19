import defaultsDeep = require('lodash.defaultsdeep')
import * as types from "../types"
import {IStrictValidation, ValidationInput, ValidationResult} from "../types"
import defaultConfig from "../defaultConfig"
import {standarizeInput} from "../util/standarizeInput"

export class SyntaxValidation implements IStrictValidation {
    _config: types.BankAccountValidationConfig

    constructor(config: Partial<types.BankAccountValidationConfig>) {
        this._config = defaultsDeep({}, config, defaultConfig)
    }

    canValidate(): Boolean {
        return true
    }

    validate(input: ValidationInput): ValidationResult {
        input = standarizeInput(input, 'none')

        let isValid = input.type === 'none'

        return {
            valid: isValid,
            reason: isValid ? null : `invalid syntax for type: '${input.type}'`

        }
    }
}
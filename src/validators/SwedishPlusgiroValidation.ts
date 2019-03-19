import defaultsDeep = require('lodash.defaultsdeep')
import * as types from "../types"
import {IStrictValidation, ValidationInput} from "../types"
import defaultConfig from "../defaultConfig"
import {standarizeInput} from "../util/standarizeInput"

export class SwedishPlusgiroValidation implements IStrictValidation {
    _config: types.BankAccountValidationConfig
    private _syntaxTester: RegExp

    constructor(config: Partial<types.BankAccountValidationConfig>) {
        this._config = defaultsDeep({}, config, defaultConfig)
        this._syntaxTester = /^(\d{1,7})-\d$/
    }

    canValidate(input: ValidationInput): Boolean {
        input = standarizeInput(input, 'none')

        return (input.type === 'plusgiro')
    }

    validate(input: ValidationInput) {
        input = standarizeInput(input, 'none')

        if (input.countryCode !== 'SE'){
            return {
                valid: false,
                reason: `Plus giro account type require country code to be SE. Received: ${input.countryCode }`
            }
        }
        let isValid = this._syntaxTester.test(input.accountNumber)
        return {
            valid: isValid,
            reason: isValid ? null : 'Number does not match the Swedish plus giro syntax'
        }
    }
}
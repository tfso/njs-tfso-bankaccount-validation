import defaultsDeep = require('lodash.defaultsdeep')
import * as types from '../types'
import { IStrictValidation, ValidationInput } from '../types'
import defaultConfig from '../defaultConfig'
import { standarizeInput } from '../util/standarizeInput'
import { calculate, modulusValidation } from '../util/modulusCalculation'

export class SwedishPlusgiroValidation implements IStrictValidation {
    _config: types.BankAccountValidationConfig
    private _syntaxTester: RegExp

    constructor(config: Partial<types.BankAccountValidationConfig>) {
        this._config = defaultsDeep({}, config, defaultConfig)
        this._syntaxTester = /^(\d{1,7})-\d$/
    }

    canValidate(input: ValidationInput): boolean {
        input = standarizeInput(input, 'none')

        return input.type === 'plusgiro'
    }

    validate(input: ValidationInput) {
        input = standarizeInput(input, 'none')

        if (input.countryCode !== 'SE') {
            return {
                valid: false,
                reason: `Plus giro account type require country code to be SE. Received: ${input.countryCode}`,
            }
        }

        const validSyntax = this._syntaxTester.test(input.accountNumber)
        const validModCheck = sweMod10(input.accountNumber.replace('-', ''))
        return {
            valid: validSyntax && validModCheck,
            reason: !validSyntax
                ? 'Account number does not match the Swedish plus giro format. Valid format is "XXXXX(X(X)))-X"'
                : !validModCheck
                  ? 'Account number does not pass the sum check'
                  : null,
        }
    }
}

function sweMod10(number: string) {
    const sum = calculate(number, [2, 1], (n: any) => (n > 9 ? n - 9 : n))
    return modulusValidation(sum, 10)
}

import defaultsDeep = require('lodash.defaultsdeep')
import * as types from "../types"
import {IStrictValidation, ValidationInput} from "../types"
import defaultConfig from "../defaultConfig"
import {standarizeInput} from "../util/standarizeInput"
import {calculate, modulusValidation} from "../util/modulusCalculation"

export class SwedishBankgiroValidation implements IStrictValidation {
    _config: types.BankAccountValidationConfig
    private _syntaxTester: RegExp

    constructor(config: Partial<types.BankAccountValidationConfig>) {
        this._config = defaultsDeep({}, config, defaultConfig)
        this._syntaxTester = /^\d{3,4}-\d{4}$/
    }

    canValidate(input: ValidationInput): Boolean {
        return (input.type === 'bankgiro')
    }

    validate(input: ValidationInput) {
        input = standarizeInput(input, 'none')

        if (input.countryCode !== 'SE'){
            return {
                valid: false,
                reason: `Bank giro account type require country code to be SE. Received: ${input.countryCode }`
            }
        }

        let validSyntax = this._syntaxTester.test(input.accountNumber)
        let validModCheck = sweMod10(input.accountNumber.replace('-', ''))
        return {
            valid: validSyntax &&
                validModCheck,
            reason: !validSyntax ? 'Account number does not match the Swedish bank giro format. Valid format is "XX(X)-XXXX"' :
                !validModCheck ? 'Account number does not pass the sum check': null
        }
    }
}

function sweMod10(number:string){
    let sum = calculate(number, [2,1], (n:any) => n>9 ? n-9:n)
    return modulusValidation(sum, 10)
}
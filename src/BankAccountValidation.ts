import * as types from './types'
import defaultsDeep = require('lodash.defaultsdeep')
import defaultConfig from './defaultConfig'
import {AcceptanceType, IValidation, ValidationInput, ValidationsResult, IStrictValidation, ValidationResult} from "./types"
import {standarizeInput} from "./util/standarizeInput"

class StrictValidationWrapper implements IValidation{
    _strictValidation: types.IStrictValidation

    constructor(strictValidation:IStrictValidation) {
        this._strictValidation = strictValidation
    }

    canValidate(input: any): Boolean {
        return this._strictValidation.canValidate(standarizeInput(input, 'none'))
    }

    validate(input: any): ValidationResult {
        return this._strictValidation.validate(standarizeInput(input, 'none'))
    }
}

export class BankAccountValidation{
    _config: types.BankAccountValidationConfig
    _validationRules: (types.IValidation)[]

    constructor(config: Partial<types.BankAccountValidationConfig>){
        this._config = defaultsDeep({}, config, defaultConfig)
        this._validationRules = []
    }

    addStrict(validationRule: types.IStrictValidation){
        this._validationRules.push(
            new StrictValidationWrapper(validationRule)
        )
    }

    add(validationRule: types.IValidation){
        this._validationRules.push(validationRule)
    }

    validate(input:string|ValidationInput): ValidationsResult{
        const validationResults = this._validationRules
            .filter(validationRule =>{
                return validationRule.canValidate(input)
            })
            .map(validationRule =>{
                return validationRule.validate(input)
            })

        if (validationResults.length === 0){
            return {
                valid: undefined,
                reasons:[]
            }
        }

        const validResults = validationResults.filter(result => result.valid)
        const invalidResults = validationResults.filter(result => !result.valid)

        // @ts-ignore
        const reasons : string[] = invalidResults
            .map(result => result.reason)

        if (this._config.acceptanceType === AcceptanceType.some){
            return {
                valid: validResults.length > 0,
                reasons
            }
        }
        if (this._config.acceptanceType === AcceptanceType.all){
            return {
                valid: validResults.length === validationResults.length,
                reasons
            }
        }
        return {
            valid: undefined,
            reasons:[]
        }
    }
}
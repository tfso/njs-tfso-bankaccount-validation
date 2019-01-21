import * as types from './types'
import defaultsDeep = require('lodash.defaultsdeep')
import defaultConfig from './defaultConfig'
import {AcceptanceType, ValidationInput} from "./types"

export class BankAccountValidation{
    _config: types.BankAccountValidationConfig
    _validationRules: types.IValidation[]

    constructor(config: Partial<types.BankAccountValidationConfig>){
        this._config = defaultsDeep({}, config, defaultConfig)
        this._validationRules = []
    }

    add(validationRule: types.IValidation){
        this._validationRules.push(validationRule)
    }

    validate(input:string|ValidationInput){
        let validationResults = this._validationRules
            .filter(validationRule =>{
                return validationRule.canValidate(input)
            })
            .map(validationRule =>{
                return validationRule.validate(input)
            })

        let validResults = validationResults.filter(result => result.valid === true)

        if (validationResults.length === 0){
            return null
        }

        if (this._config.acceptanceType === AcceptanceType.some){
            return validResults.length > 0
        }
        if (this._config.acceptanceType === AcceptanceType.all){
            return validResults.length === validationResults.length
        }
        return null
    }
}
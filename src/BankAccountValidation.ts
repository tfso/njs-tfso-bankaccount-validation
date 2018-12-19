import * as types from './types'
import defaultsDeep = require('lodash.defaultsdeep')
import defaultConfig from './defaultConfig'
import {ValidationInput} from "./types"

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
        return this._validationRules
            .filter(validationRule =>{
                return validationRule.canValidate(input)
            })
            .map(validationRule =>{
                return validationRule.validate(input)
            })
    }
}
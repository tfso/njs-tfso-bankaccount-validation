import * as types from './types'
import defaultsDeep = require('lodash.defaultsdeep')
import defaultConfig from './defaultConfig'
import {IValidation} from "./types"

export class IbanValidation implements IValidation{
    _config: types.BankAccountValidationConfig
    _validationRules: types.IValidation[]

    constructor(config: Partial<types.BankAccountValidationConfig>){
        this._config = defaultsDeep({}, config, defaultConfig)
        this._validationRules = []
    }

    canValidate(input: any): Boolean {
        if (typeof input === "string") {
            console.log(input.toString())
        }
        if (typeof input === "object") {
            console.log(JSON.stringify(input))
        }
        return true
    }

    validate(input:any){
        return {
            valid: !!input
        }
    }
}
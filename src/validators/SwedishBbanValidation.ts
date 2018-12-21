import defaultsDeep = require('lodash.defaultsdeep')
import * as types from "../types"
import {IValidation, ValidationInput} from "../types"
import defaultConfig from "../defaultConfig"
import {swedishBanks} from "../util/swedishBanks"
import {standarizeInput} from "../util/standarizeInput"
import * as checkdigit from 'checkdigit'

interface Account{
    clearing: number
    accountNumber: string,
    bban: string,
    type: string
    length: number
}

export class SwedishBbanValidation implements IValidation {
    _config: types.BankAccountValidationConfig
    private _syntaxTester: RegExp

    constructor(config: Partial<types.BankAccountValidationConfig>) {
        this._config = defaultsDeep({}, config, defaultConfig)
        /* syntax: clearing (4 digit) + account number (7, 9 or 10 digit) */
        this._syntaxTester = /^\d{4}(:?\d{7}|\d{9}|\d{10})$/
    }

    canValidate(input: string | ValidationInput): Boolean {
        input = standarizeInput(input)

        if (input.type && input.type!=='bban'){
            return false
        }

        return input.countryCode === 'SE'
    }

    validate(input: string | ValidationInput) {
        input = standarizeInput(input)
        let bban = input.accountNumber

        let valid = this._syntaxTester.test(bban)

        if (!valid){
            return {valid:false}
        }

        let account = this.parseBban(bban)

        if (
            account.type === '1.1' && account.length === 7  && checkdigit.mod11.isValid(account.bban.substr(0,10)) ||
            account.type === '1.2' && account.length === 7  && checkdigit.mod11.isValid(account.bban) ||
            account.type === '2.1' && account.length === 10 && checkdigit.mod10.isValid(account.accountNumber) ||
            account.type === '2.2' && account.length === 9  && checkdigit.mod11.isValid(account.accountNumber) ||
            account.type === '2.3' && account.length === 10 && checkdigit.mod10.isValid(account.accountNumber)
        ){
            return {valid:true}
        }

        return {valid:false}
    }

    private parseBban(bban:string):Account {
        let clearing = parseInt(bban.substr(0,4))
        let accountNumber = bban.substr(4)
        let type = this.getType(clearing)

        return {
            clearing,
            accountNumber,
            bban,
            type,
            length: accountNumber.length
        }
    }

    private getType(clearingNumber:number):string {
        let banks = swedishBanks.filter(bank => {
            return bank.clearingFrom <= clearingNumber && clearingNumber <= bank.clearingTo
        })

        if (banks.length !== 1 ) throw new Error('Clearing number is not supported')
        let bank = banks[0]

        return bank.type + '.' + bank.comment
    }
}
import defaultsDeep = require('lodash.defaultsdeep')
import * as types from "../types"
import {IStrictValidation, ValidationInput, ValidationResult} from "../types"
import defaultConfig from "../defaultConfig"
import {swedishBanks} from "../util/swedishBanks"
import {standarizeInput} from "../util/standarizeInput"
import {calculate, modulusValidation} from '../util/modulusCalculation'

interface Account{
    clearing: number
    accountNumber: string,
    bban: string,
    type: string
    length: number
}

export class SwedishBbanValidation implements IStrictValidation {
    _config: types.BankAccountValidationConfig
    private _syntaxTester: RegExp

    constructor(config: Partial<types.BankAccountValidationConfig>) {
        this._config = defaultsDeep({}, config, defaultConfig)
        /* syntax: optional clearing (4 digit) + account number (7, 9 or 10 digit)*/
        this._syntaxTester = /^(\d{4}(:?\d{7}|\d{9}|\d{10})|(:?\d{7}|\d{9}|\d{10}))$/
    }

    canValidate(input: ValidationInput): Boolean {
        input = standarizeInput(input, 'none')

        return (input.type === 'bban')
            && input.countryCode === 'SE'
    }

    validate(input: ValidationInput): ValidationResult {
        input = standarizeInput(input, 'none')
        let account = this.parseClearingAndAccountNumber(input.clearingNumber || null, input.accountNumber)

        let validSyntax = this._syntaxTester.test(account.bban)

        if (!validSyntax){
            return {
                valid: false,
                reason: 'Invalid swedish syntax. Number must be 11, 13 or 14 digits long (incl clearing number)'
            }
        }

        if (
            account.type === '1.1' && account.length === 7  && sweMod11(account.bban.substr(1)) ||
            account.type === '1.2' && account.length === 7  && sweMod11(account.bban) ||
            account.type === '2.1' && account.length === 10 && sweMod10(account.accountNumber) ||
            account.type === '2.2' && account.length === 9  && sweMod11(account.accountNumber) ||
            account.type === '2.3' && account.length === 10 && sweMod10(account.accountNumber)
        ){
            return {
                valid: true,
                reason: null
            }
        }

        return {
            valid: false,
            reason: 'Invalid Swedish bban'
        }
    }

    private parseClearingAndAccountNumber(_clearing:string|null, bban:string):Account {
        // swedbank used 5 chars in clearing, remove the last one (always a 9-er!?)
        let clearing = _clearing ? parseInt(_clearing) : parseInt(bban.substr(0,4))
        let accountNumber = _clearing ? bban :bban.substr(4)
        let type = this.getType(clearing)

        return {
            clearing,
            accountNumber,
            bban:  [clearing, accountNumber].join(''),
            type,
            length: accountNumber.length
        }
    }

    private getType(clearingNumber:number):string {
        let banks = swedishBanks.filter(bank => {
            return bank.clearingFrom <= clearingNumber && clearingNumber <= bank.clearingTo
        })

        if (banks.length !== 1 ) {
            return '0.0'
        }

        let bank = banks[0]

        return bank.type + '.' + bank.comment
    }
}


function sweMod10(number:string){
    let sum = calculate(number, [2,1], (n:any) => n>9 ? n-9:n)
    return modulusValidation(sum, 10)
}

function sweMod11(number:string){
    let sum = calculate(number, [10,9,8,7,6,5,4,3,2,1])
    return modulusValidation(sum, 11)
}
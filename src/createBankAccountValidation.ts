import {BankAccountValidation} from '../src'
import * as types from "./types"
import {SwedishBankgiroValidation} from "./validators/SwedishBankgiroValidation"
import {SwedishPlusgiroValidation} from "./validators/SwedishPlusgiroValidation"
import {SwedishBbanValidation} from "./validators/SwedishBbanValidation"
import {NorwegianBbanValidation} from "./validators/NorwegianBbanValidation"
import {IbanValidation} from "./validators/IbanValidation"

export function createValidationWithAllAvailableValidators(config: Partial<types.BankAccountValidationConfig>){
    let bankAccountValidation = new BankAccountValidation(config)
    bankAccountValidation.add(new IbanValidation(config))
    bankAccountValidation.add(new SwedishBankgiroValidation(config))
    bankAccountValidation.add(new SwedishPlusgiroValidation(config))
    bankAccountValidation.add(new SwedishBbanValidation(config))
    bankAccountValidation.add(new NorwegianBbanValidation(config))
    return bankAccountValidation
}
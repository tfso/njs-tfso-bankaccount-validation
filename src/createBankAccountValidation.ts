import {BankAccountValidation} from '../src'
import * as types from "./types"
import {SwedishBankgiroValidation} from "./validators/SwedishBankgiroValidation"
import {SwedishPlusgiroValidation} from "./validators/SwedishPlusgiroValidation"
import {SwedishBbanValidation} from "./validators/SwedishBbanValidation"
import {NorwegianBbanValidation} from "./validators/NorwegianBbanValidation"
import {IbanValidation} from "./validators/IbanValidation"
import {DanishBbanValidation} from "./validators/DanishBbanValidation"
// import {SyntaxValidation} from "./validators/SyntaxValidation"

export function createValidationWithAllAvailableValidators(config: Partial<types.BankAccountValidationConfig>){
    const bankAccountValidation = new BankAccountValidation(config)
    // bankAccountValidation.add(new SyntaxValidation(config))
    bankAccountValidation.addStrict(new IbanValidation(config))
    bankAccountValidation.addStrict(new SwedishBankgiroValidation(config))
    bankAccountValidation.addStrict(new SwedishPlusgiroValidation(config))
    bankAccountValidation.addStrict(new SwedishBbanValidation(config))
    bankAccountValidation.addStrict(new NorwegianBbanValidation(config))
    bankAccountValidation.addStrict(new DanishBbanValidation(config))
    return bankAccountValidation
}
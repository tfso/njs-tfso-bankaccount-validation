import * as chai from 'chai'
import {BankAccountValidation} from '../src'
import {IbanValidation} from '../src/validators/IbanValidation'
import {AcceptValidation} from '../src/validators/AcceptValidation'
import {RejectValidation} from '../src/validators/RejectValidation'
import {AcceptanceType} from "../src/types"

describe('BankAccountValidation', ()=> {
    describe('when adding validators', ()=> {
        it('should be used to validate an account', ()=>{
            let bankAccountValidation = new BankAccountValidation({})
            bankAccountValidation.add(new IbanValidation({}))
            chai.expect(bankAccountValidation.validate('DK5750510001322617')).to.equal(true)
        })

        it('should be used to invalidate an account', ()=>{
            let bankAccountValidation = new BankAccountValidation({})
            bankAccountValidation.add(new IbanValidation({}))
            chai.expect(bankAccountValidation.validate('DK5750510001322618')).to.equal(false)
        })
    })

    describe('when using acceptance type allAccept', ()=> {
        it('should invalidate when there is one that invalidates', ()=>{
            let bankAccountValidation = new BankAccountValidation({acceptanceType: AcceptanceType.all})
            bankAccountValidation.add(new AcceptValidation())
            bankAccountValidation.add(new RejectValidation())
            chai.expect(bankAccountValidation.validate('')).to.equal(false)
        })
        it('should validate when all validates', ()=>{
            let bankAccountValidation = new BankAccountValidation({acceptanceType: AcceptanceType.all})
            bankAccountValidation.add(new AcceptValidation())
            bankAccountValidation.add(new AcceptValidation())
            chai.expect(bankAccountValidation.validate('')).to.equal(true)
        })
    })

    describe('when using acceptance type someAccept', ()=> {
        it('should invalidate when all invalidates', ()=>{
            let bankAccountValidation = new BankAccountValidation({acceptanceType: AcceptanceType.some})
            bankAccountValidation.add(new RejectValidation())
            bankAccountValidation.add(new RejectValidation())
            chai.expect(bankAccountValidation.validate('')).to.equal(false)
        })
        it('should validate when some validates', ()=>{
            let bankAccountValidation = new BankAccountValidation({acceptanceType: AcceptanceType.some})
            bankAccountValidation.add(new AcceptValidation())
            bankAccountValidation.add(new RejectValidation())
            chai.expect(bankAccountValidation.validate('')).to.equal(true)
        })
    })
})

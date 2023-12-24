import * as chai from 'chai'
import {BankAccountValidation} from '../'
import {IbanValidation} from '../validators/IbanValidation'
import {AcceptValidation} from '../validators/AcceptValidation'
import {RejectValidation} from '../validators/RejectValidation'
import {AcceptanceType} from "../types"

describe('BankAccountValidation', ()=> {
    describe('when adding validators', ()=> {
        it('should be used to validate an account', ()=>{
            const bankAccountValidation = new BankAccountValidation({})
            bankAccountValidation.addStrict(new IbanValidation({}))
            chai.expect(bankAccountValidation.validate('DK5750510001322617')).to.deep.equal({
                valid: true,
                reasons: []
            })
        })

        it('should be used to invalidate an account', ()=>{
            const bankAccountValidation = new BankAccountValidation({})
            bankAccountValidation.addStrict(new IbanValidation({}))
            chai.expect(bankAccountValidation.validate('DK5750510001322618')).to.deep.equal({
                valid: false,
                reasons: ["Invalid iban"]
            })
        })
    })

    describe('when using acceptance type allAccept', ()=> {
        it('should invalidate when there is one that invalidates', ()=>{
            const bankAccountValidation = new BankAccountValidation({acceptanceType: AcceptanceType.all})
            bankAccountValidation.add(new AcceptValidation())
            bankAccountValidation.add(new RejectValidation())
            chai.expect(bankAccountValidation.validate({accountNumber:''})).to.deep.equal({
                valid: false,
                reasons: ["Invalid"]
            })
        })
        it('should validate when all validates', ()=>{
            const bankAccountValidation = new BankAccountValidation({acceptanceType: AcceptanceType.all})
            bankAccountValidation.add(new AcceptValidation())
            bankAccountValidation.add(new AcceptValidation())
            chai.expect(bankAccountValidation.validate({accountNumber:''})).to.deep.equal({
                valid: true,
                reasons: []
            })
        })
        it('should return null when no usable validators is found', ()=>{
            const bankAccountValidation = new BankAccountValidation({acceptanceType: AcceptanceType.all})
            chai.expect(bankAccountValidation.validate({accountNumber:''})).to.deep.equal({
                valid:undefined,
                reasons:[]})
        })
    })

    describe('when using acceptance type someAccept', ()=> {
        it('should invalidate when all invalidates', ()=>{
            const bankAccountValidation = new BankAccountValidation({acceptanceType: AcceptanceType.some})
            bankAccountValidation.add(new RejectValidation())
            bankAccountValidation.add(new RejectValidation())
            chai.expect(bankAccountValidation.validate({accountNumber:''})).to.deep.equal({
                valid: false,
                reasons: [
                    "Invalid",
                    "Invalid"
                ]
            })
        })
        it('should validate when some validates', ()=>{
            const bankAccountValidation = new BankAccountValidation({acceptanceType: AcceptanceType.some})
            bankAccountValidation.add(new AcceptValidation())
            bankAccountValidation.add(new RejectValidation())
            chai.expect(bankAccountValidation.validate({accountNumber:''})).to.deep.equal({
                valid: true,
                reasons: [
                    "Invalid"
                ]
            })
        })
        it('should return null when no usable validators is found', ()=>{
            const bankAccountValidation = new BankAccountValidation({acceptanceType: AcceptanceType.some})
            chai.expect(bankAccountValidation.validate({accountNumber:''})).to.deep.equal({
                valid:undefined,
                reasons:[]
            })
        })
    })
})

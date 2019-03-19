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
            bankAccountValidation.addStrict(new IbanValidation({}))
            chai.expect(bankAccountValidation.validate('DK5750510001322617')).to.deep.equal({
                valid: true,
                reasons: []
            })
        })

        it('should be used to invalidate an account', ()=>{
            let bankAccountValidation = new BankAccountValidation({})
            bankAccountValidation.addStrict(new IbanValidation({}))
            chai.expect(bankAccountValidation.validate('DK5750510001322618')).to.deep.equal({
                valid: false,
                reasons: []
            })
        })
    })

    describe('when using acceptance type allAccept', ()=> {
        it('should invalidate when there is one that invalidates', ()=>{
            let bankAccountValidation = new BankAccountValidation({acceptanceType: AcceptanceType.all})
            bankAccountValidation.add(new AcceptValidation())
            bankAccountValidation.add(new RejectValidation())
            chai.expect(bankAccountValidation.validate({accountNumber:''})).to.deep.equal({
                valid: false,
                reasons: []
            })
        })
        it('should validate when all validates', ()=>{
            let bankAccountValidation = new BankAccountValidation({acceptanceType: AcceptanceType.all})
            bankAccountValidation.add(new AcceptValidation())
            bankAccountValidation.add(new AcceptValidation())
            chai.expect(bankAccountValidation.validate({accountNumber:''})).to.deep.equal({
                valid: true,
                reasons: []
            })
        })
        it('should return null when no usable validators is found', ()=>{
            let bankAccountValidation = new BankAccountValidation({acceptanceType: AcceptanceType.all})
            chai.expect(bankAccountValidation.validate({accountNumber:''})).to.deep.equal({
                valid:undefined,
                reasons:[]})
        })
    })

    describe('when using acceptance type someAccept', ()=> {
        it('should invalidate when all invalidates', ()=>{
            let bankAccountValidation = new BankAccountValidation({acceptanceType: AcceptanceType.some})
            bankAccountValidation.add(new RejectValidation())
            bankAccountValidation.add(new RejectValidation())
            chai.expect(bankAccountValidation.validate({accountNumber:''})).to.deep.equal({
                valid: false,
                reasons: []
            })
        })
        it('should validate when some validates', ()=>{
            let bankAccountValidation = new BankAccountValidation({acceptanceType: AcceptanceType.some})
            bankAccountValidation.add(new AcceptValidation())
            bankAccountValidation.add(new RejectValidation())
            chai.expect(bankAccountValidation.validate({accountNumber:''})).to.deep.equal({
                valid: true,
                reasons: []
            })
        })
        it('should return null when no usable validators is found', ()=>{
            let bankAccountValidation = new BankAccountValidation({acceptanceType: AcceptanceType.some})
            chai.expect(bankAccountValidation.validate({accountNumber:''})).to.deep.equal({
                valid:undefined,
                reasons:[]
            })
        })
    })
})

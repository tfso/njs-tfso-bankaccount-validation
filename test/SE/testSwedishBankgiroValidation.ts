import * as chai from 'chai'
import {SwedishBankgiroValidation} from '../../src/validators/SwedishBankgiroValidation'

describe('SwedishBankgiroValidation', ()=> {
    let validation:SwedishBankgiroValidation
    beforeEach(()=> {
        validation = new SwedishBankgiroValidation({})
    })

    describe('when validating', ()=> {
        it('should validate a valid bankgiro account number on format XXX-XXXX', ()=>{
            chai.expect(validation.validate({accountNumber: '991-2346', countryCode: 'SE'})).to.deep.equal({
                valid: true,
                reason: null
            })
        })
        it('should validate a valid bankgiro account number on format XXXX-XXXX', ()=>{
            chai.expect(validation.validate({accountNumber: '5555-5551', countryCode: 'SE'})).to.deep.equal({
                valid: true,
                reason: null
            })
        })

        it('should invalidate a bankgiro account number when not passing mod 10 sum check', ()=>{
            chai.expect(validation.validate({accountNumber: '123-1234', countryCode: 'SE'})).to.deep.equal({
                valid: false,
                reason: "Account number does not pass the sum check"
            })
        })

        it('should invalidate an invalid bankgiro account number', ()=>{
            chai.expect(validation.validate({accountNumber: '12345-1234', countryCode: 'SE'})).to.deep.equal({
                valid: false,
                reason: 'Account number does not match the Swedish bank giro format. Valid format is "XX(X)-XXXX"'
            })
        })

        it('should invalidate a non swedish country', ()=>{
            chai.expect(validation.validate({accountNumber: 'invalid', countryCode: 'NO'})).to.deep.equal({
                valid: false,
                reason: "Bank giro account type require country code to be SE. Received: NO"
            })
        })
    })

    describe('when determining suitability', ()=> {
        it('should accept bankgiro', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'NO', type: 'bankgiro'}))
                .to.equal(true)
        })

        it('should not accept a type different from bankgiro', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'SE', type: 'bban'}))
                .to.equal(false)
        })
    })
})

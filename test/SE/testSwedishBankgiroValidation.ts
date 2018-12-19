import * as chai from 'chai'
// import * as sinonChai from 'sinon-chai'
import {SwedishBankgiroValidation} from '../../src/validators/SwedishBankgiroValidation'

describe('SwedishBankgiroValidation', ()=> {
    let validation:SwedishBankgiroValidation
    beforeEach(()=> {
        validation = new SwedishBankgiroValidation({})
    })

    describe('when validating', ()=> {
        it('should validate a valid bankgiro account number as string input', ()=>{
            chai.expect(validation.validate('1234-1234')).to.deep.equal({
                'valid': true
            })
        })

        it('should validate a valid bankgiro account number as object input', ()=>{
            chai.expect(validation.validate({accountNumber: '123-1234'})).to.deep.equal({
                'valid': true
            })
        })

        it('should invalidate an invalid bankgiro account number', ()=>{
            chai.expect(validation.validate('12345-1234')).to.deep.equal({
                'valid': false
            })
        })
    })

    describe('when determining suitability', ()=> {
        it('should accept a swedish country', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'SE'})).to.equal(true)
        })
        it('should not accept a norwegian country', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'NO'})).to.equal(false)
        })

        it('should not accept a type different from bankgiro', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'SE', type: 'bban'})).to.equal(false)
        })
    })
})

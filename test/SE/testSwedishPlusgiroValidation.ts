import * as chai from 'chai'
// import * as sinonChai from 'sinon-chai'
import {SwedishPlusgiroValidation} from '../../src/validators/SwedishPlusgiroValidation'

describe('SwedishPlusgiroValidation', ()=> {
    let validation:SwedishPlusgiroValidation
    beforeEach(()=> {
        validation = new SwedishPlusgiroValidation({})
    })

    describe('when validating', ()=> {
        it('should validate a valid plusgiro account number as string input', ()=>{
            chai.expect(validation.validate('12345-1')).to.deep.equal({
                'valid': true
            })
        })

        it('should validate a valid plusgiro account number as object input', ()=>{
            chai.expect(validation.validate({accountNumber: '1234567-1'})).to.deep.equal({
                'valid': true
            })
        })

        it('should invalidate an invalid plusgiro account number', ()=>{
            chai.expect(validation.validate('123456-1')).to.deep.equal({
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

        it('should not accept a type different from plusgiro', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'SE', type: 'bban'})).to.equal(false)
        })
    })
})

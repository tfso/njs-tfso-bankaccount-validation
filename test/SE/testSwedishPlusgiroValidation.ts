import * as chai from 'chai'
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

        it('should validate a plusgiro account number with format X-Y', ()=>{
            chai.expect(validation.validate('1-1')).to.deep.equal({
                'valid': true
            })
        })

        it('should validate a plusgiro account number with format XX-Y', ()=>{
            chai.expect(validation.validate('22-1')).to.deep.equal({
                'valid': true
            })
        })

        it('should validate a plusgiro account number with format XXX-Y', ()=>{
            chai.expect(validation.validate('333-1')).to.deep.equal({
                'valid': true
            })
        })

        it('should validate a plusgiro account number with format XXXX-Y', ()=>{
            chai.expect(validation.validate('4444-1')).to.deep.equal({
                'valid': true
            })
        })

        it('should validate a plusgiro account number with format XXXXX-Y', ()=>{
            chai.expect(validation.validate('55555-1')).to.deep.equal({
                'valid': true
            })
        })

        it('should validate a plusgiro account number with format XXXXXX-Y', ()=>{
            chai.expect(validation.validate('666666-1')).to.deep.equal({
                'valid': true
            })
        })

        it('should validate a plusgiro account number with format XXXXXXX-Y', ()=>{
            chai.expect(validation.validate('7777777-1')).to.deep.equal({
                'valid': true
            })
        })

        it('should validate a valid plusgiro account number as object input', ()=>{
            chai.expect(validation.validate({accountNumber: '1234567-1'})).to.deep.equal({
                'valid': true
            })
        })

        it('should invalidate an invalid plusgiro account number', ()=>{
            chai.expect(validation.validate('12345678-1')).to.deep.equal({
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

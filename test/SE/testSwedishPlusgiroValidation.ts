import * as chai from 'chai'
import {SwedishPlusgiroValidation} from '../../src/validators/SwedishPlusgiroValidation'

describe('SwedishPlusgiroValidation', ()=> {
    let validation:SwedishPlusgiroValidation
    beforeEach(()=> {
        validation = new SwedishPlusgiroValidation({})
    })

    describe('when validating', ()=> {
        // it('should validate a valid plusgiro account number as string input', ()=>{
        //     chai.expect(validation.validate('12345-1')).to.deep.equal({
        //         valid: true,
        //         reason: null
        //     })
        // })

        it('should validate a plusgiro account number with format X-Y', ()=>{
            chai.expect(validation.validate({accountNumber:'1-1', countryCode:'SE'})).to.deep.equal({
                valid: true,
                reason: null
            })
        })

        it('should validate a plusgiro account number with format XX-Y', ()=>{
            chai.expect(validation.validate({accountNumber:'22-1', countryCode:'SE'})).to.deep.equal({
                valid: true,
                reason: null
            })
        })

        it('should validate a plusgiro account number with format XXX-Y', ()=>{
            chai.expect(validation.validate({accountNumber:'333-1', countryCode:'SE'})).to.deep.equal({
                valid: true,
                reason: null
            })
        })

        it('should validate a plusgiro account number with format XXXX-Y', ()=>{
            chai.expect(validation.validate({accountNumber:'4444-1', countryCode:'SE'})).to.deep.equal({
                valid: true,
                reason: null
            })
        })

        it('should validate a plusgiro account number with format XXXXX-Y', ()=>{
            chai.expect(validation.validate({accountNumber:'55555-1', countryCode:'SE'})).to.deep.equal({
                valid: true,
                reason: null
            })
        })

        it('should validate a plusgiro account number with format XXXXXX-Y', ()=>{
            chai.expect(validation.validate({accountNumber:'666666-1', countryCode:'SE'})).to.deep.equal({
                valid: true,
                reason: null
            })
        })

        it('should validate a plusgiro account number with format XXXXXXX-Y', ()=>{
            chai.expect(validation.validate({accountNumber:'7777777-1', countryCode:'SE'})).to.deep.equal({
                valid: true,
                reason: null
            })
        })

        it('should validate a valid plusgiro account number as object input', ()=>{
            chai.expect(validation.validate({accountNumber: '1234567-1', countryCode:'SE'})).to.deep.equal({
                valid: true,
                reason: null
            })
        })

        it('should invalidate an invalid plusgiro account number', ()=>{
            chai.expect(validation.validate({accountNumber:'12345678-1', countryCode:'SE'})).to.deep.equal({
                valid: false,
                reason: "Number does not match the Swedish plus giro syntax"
            })
        })

        it('should invalidate a non swedish country', ()=>{
            chai.expect(validation.validate({accountNumber: 'invalid', countryCode: 'NO'})).to.deep.equal({
                valid: false,
                reason: 'Plus giro account type require country code to be SE. Received: NO'
            })
        })
    })

    describe('when determining suitability', ()=> {
        it('should accept plusgiro', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'NO', type: 'plusgiro'}))
                .to.equal(true)
        })

        it('should not accept a type different from plusgiro', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'SE', type: 'bban'}))
                .to.equal(false)
        })
    })
})

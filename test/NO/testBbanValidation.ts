import * as chai from 'chai'
// import * as sinonChai from 'sinon-chai'
import {NorwegianBbanValidation} from '../../src/validators/NorwegianBbanValidation'

// 11110077949
// 22220012607
// 33330027946
// 44440025746
// 55550090405
// 66660052292
// 77770076598
// 88880051606
// 99990043120

describe('NorwegianBbanValidation', ()=> {
    let validation:NorwegianBbanValidation
    beforeEach(()=> {
        validation = new NorwegianBbanValidation({})
    })

    describe('when validating', ()=> {
        it('should validate a valid Norwegian BBAN account as string input', ()=>{
            chai.expect(validation.validate('11110077949')).to.deep.equal({
                'valid': true
            })
        })

        it('should validate a valid Norwegian BBAN account as object input', ()=>{
            chai.expect(validation.validate({accountNumber: '11110077949'})).to.deep.equal({
                'valid': true
            })
        })

        it('should invalidate an invalid Norwegian BBAN account', ()=>{
            chai.expect(validation.validate('11110077948')).to.deep.equal({
                'valid': false
            })
        })
    })

    describe('when determining suitability', ()=> {
        it('should accept a norwegian country', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'NO'})).to.equal(true)
        })
        it('should not accept a swedish country', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'SE'})).to.equal(false)
        })

        it('should not accept a type different from bban', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'NO', type: 'iban'})).to.equal(false)
        })
    })
})

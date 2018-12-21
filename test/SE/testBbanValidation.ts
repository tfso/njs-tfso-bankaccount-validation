import * as chai from 'chai'
// import * as sinonChai from 'sinon-chai'
import {SwedishBbanValidation} from '../../src/validators/SwedishBbanValidation'

// 11110077949
// 22220012607
// 33330027946
// 44440025746
// 55550090405
// 66660052292
// 77770076598
// 88880051606
// 99990043120

describe('SwedishBbanValidation', ()=> {
    let validation:SwedishBbanValidation
    beforeEach(()=> {
        validation = new SwedishBbanValidation({})
    })

    describe('when validating', ()=> {
    })

    describe('when determining suitability', ()=> {
        it('should accept a Swedish country', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'SE'})).to.equal(true)
        })
        it('should not accept a norwegian country', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'NO'})).to.equal(false)
        })

        it('should not accept a type different from bban', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'SE', type: 'iban'})).to.equal(false)
        })
    })
})

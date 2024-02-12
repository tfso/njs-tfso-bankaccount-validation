import * as chai from 'chai'
import {PL_BbanValidation} from "../../validators/PL_BbanValidation"

describe('PL_BbanValidation', ()=> {
    let validation:PL_BbanValidation
    beforeEach(()=> {
        validation = new PL_BbanValidation({})
    })

    describe('when validating', ()=> {
        it('should validate a valid German BBAN account as object input', ()=>{
            chai.expect(validation.validate({accountNumber: '109010140000071219812874'})).to.deep.equal({
                valid: true,
                reason: null
            })
        })

        it('should invalidate an invalid Danish BBAN account', ()=>{
            chai.expect(validation.validate({accountNumber: '10901014000007121981287'})).to.deep.equal({
                valid: false,
                reason: 'Number does not contain 24 digits'
            })
        })
    })

    describe('when determining suitability', ()=> {
        it('should accept a polish country', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'PL', type: 'bban'})).to.equal(true)
        })
        it('should not accept a swedish country', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'SE', type: 'bban'})).to.equal(false)
        })

        it('should not accept a type different from bban', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', type: 'iban'})).to.equal(false)
        })
    })
})

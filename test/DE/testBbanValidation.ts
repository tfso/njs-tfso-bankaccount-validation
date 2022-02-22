import * as chai from 'chai'
import {DE_BbanValidation} from "../../src/validators/DE_BbanValidation"

describe('DE_BbanValidation', ()=> {
    let validation:DE_BbanValidation
    beforeEach(()=> {
        validation = new DE_BbanValidation({})
    })

    describe('when validating', ()=> {
        it('should validate a valid German BBAN account as object input', ()=>{
            chai.expect(validation.validate({accountNumber: '370400440532013000'})).to.deep.equal({
                valid: true,
                reason: null
            })
        })

        it('should invalidate an invalid Danish BBAN account', ()=>{
            chai.expect(validation.validate({accountNumber: '37040044053201300'})).to.deep.equal({
                valid: false,
                reason: 'Number does not contain 18 digits'
            })
        })
    })

    describe('when determining suitability', ()=> {
        it('should accept a german country', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'DE', type: 'bban'})).to.equal(true)
        })
        it('should not accept a swedish country', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'SE', type: 'bban'})).to.equal(false)
        })

        it('should not accept a type different from bban', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', type: 'iban'})).to.equal(false)
        })
    })
})

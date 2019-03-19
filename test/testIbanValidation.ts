import * as chai from 'chai'
import {IbanValidation} from '../src/validators/IbanValidation'

describe('IbanValidation', ()=> {
    let validation:IbanValidation
    beforeEach(()=> {
        validation = new IbanValidation({})
    })

    describe('when validating', ()=> {
        it('should validate a valid IBAN as string input', ()=>{
            chai.expect(validation.validate({accountNumber:'DK5750510001322617'})).to.deep.equal({
                valid: true,
                reason: null
            })
        })

        it('should validate a valid IBAN as object input', ()=>{
            chai.expect(validation.validate({accountNumber: 'DK5750510001322617'})).to.deep.equal({
                valid: true,
                reason: null
            })
        })

        it('should invalidate an invalid IBAN', ()=>{
            chai.expect(validation.validate({accountNumber:'DK5750510001322618'})).to.deep.equal({
                valid: false,
                reason: 'Invalid iban'
            })
        })
    })

    describe('when determining suitability', ()=> {
        it('should accept a syntactically valid IBAN with type none', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'DK5750510001322618', type: 'none'})).to.equal(true)
        })

        it('should accept a syntactically invalid IBAN only if type is set to iban', ()=>{
            chai.expect(validation.canValidate({accountNumber: '9DK5750510001322618', type: 'iban'})).to.equal(true)
        })

        it('should not accept a type different from iban or none', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'DK5750510001322618', type: 'bban'})).to.equal(false)
        })
    })
})

import * as chai from 'chai'
import {IbanValidation} from '../src/validators/IbanValidation'

describe('IbanValidation', ()=> {
    let validation:IbanValidation
    beforeEach(()=> {
        validation = new IbanValidation({})
    })

    describe('when validating', ()=> {
        it('should validate a valid IBAN as string input', ()=>{
            chai.expect(validation.validate('DK5750510001322617')).to.deep.equal({
                'valid': true
            })
        })

        it('should validate a valid IBAN as object input', ()=>{
            chai.expect(validation.validate({accountNumber: 'DK5750510001322617'})).to.deep.equal({
                'valid': true
            })
        })

        it('should invalidate an invalid IBAN', ()=>{
            chai.expect(validation.validate('DK5750510001322618')).to.deep.equal({
                'valid': false
            })
        })
    })

    describe('when determining suitability', ()=> {
        it('should accept a syntactically valid IBAN', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'DK5750510001322618'})).to.equal(true)
        })

        it('should not accept a syntactically invalid IBAN', ()=>{
            chai.expect(validation.canValidate({accountNumber: '9DK5750510001322618'})).to.equal(false)
        })

        it('should not accept a type different from iban', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'DK5750510001322618', type: 'bban'})).to.equal(false)
        })
    })
})

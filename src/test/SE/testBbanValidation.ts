import * as chai from 'chai'
import {SwedishBbanValidation} from '../../validators/SwedishBbanValidation'

describe('SwedishBbanValidation', ()=> {
    let validation:SwedishBbanValidation
    beforeEach(()=> {
        validation = new SwedishBbanValidation({})
    })

    describe('when validating with clearing number specified in the account number', ()=> {
        it('should validate a valid Swedish BBAN account', ()=>{
            chai.expect(validation.validate({accountNumber: '54401122003'} /* prod */)).to.deep.equal({
                'valid': true,
                reason: null
            })
        })

        it('should validate a valid Swedish BBAN account as object input', ()=>{
            chai.expect(validation.validate({accountNumber: '54401122003'})).to.deep.equal({
                'valid': true,
                reason: null
            })
        })

        it('should validate a valid type 1.1 Swedish BBAN account (SEB)', ()=>{
            chai.expect(validation.validate({accountNumber: '54401122003'})).to.deep.equal({
                'valid': true,
                reason: null
            })
        })

        it('should validate a valid type 1.1 Swedish BBAN account (danskebank)', ()=>{
            chai.expect(validation.validate({accountNumber: '12811122001'})).to.deep.equal({
                'valid': true,
                reason: null
            })
        })
        it('should validate a valid type 1.2 Swedish BBAN account (Dnb)', ()=>{
            chai.expect(validation.validate({accountNumber: '91951122005'})).to.deep.equal({
                'valid': true,
                reason: null
            })
        })
        it('should validate a valid type 1.2 Swedish BBAN account (Lansforsakringer WASA Bank)', ()=>{
            chai.expect(validation.validate({accountNumber: '90231122006'})).to.deep.equal({
                'valid': true,
                reason: null
            })
        })
        it('should validate a valid type 2.1 Swedish BBAN account (Sparebanken syd)', ()=>{
            chai.expect(validation.validate({accountNumber: '95701122211004'})).to.deep.equal({
                'valid': true,
                reason: null
            })
        })
        it('should validate a valid type 2.2 Swedish BBAN account (Handelsbanken)', ()=>{
            chai.expect(validation.validate({accountNumber: '6000112221009'})).to.deep.equal({
                'valid': true,
                reason: null
            })
        })
        it('should validate a valid type 2.3 Swedish BBAN account (Swedbank)', ()=>{
            chai.expect(validation.validate({accountNumber: '83881122211004'})).to.deep.equal({
                'valid': true,
                reason: null
            })
        })

        it('should invalidate an invalid Swedish BBAN account', ()=>{
            chai.expect(validation.validate({accountNumber: '54401122004'})).to.deep.equal({
                'valid': false,
                reason: "Invalid Swedish bban"
            })
        })


        it('should invalidate an unknown clearing number in a Swedish BBAN account (type 0.0)', ()=>{
            chai.expect(validation.validate({accountNumber: '90307777777'})).to.deep.equal({
                valid: false,
                reason: "Invalid Swedish bban"
            })
        })

        it('should invalidate a Swedish BBAN account with invalid syntax', ()=>{
            chai.expect(validation.validate({accountNumber: '544088888888'})).to.deep.equal({
                valid: false,
                reason: 'Invalid swedish syntax. Number must be 11, 13 or 14 digits long (incl clearing number)'
            })
        })
    })


    describe('when validating with separate clearing number specified', ()=> {
        it('should validate a valid Swedish BBAN account as object input', ()=>{
            chai.expect(validation.validate({clearingNumber:'5440', accountNumber: '1122003'})).to.deep.equal({
                'valid': true,
                reason: null
            })
        })

        it('should validate a valid type 1.1 Swedish BBAN account (SEB)', ()=>{
            chai.expect(validation.validate({clearingNumber:'5440', accountNumber: '1122003'})).to.deep.equal({
                'valid': true,
                reason: null
            })
        })

        it('should validate a valid type 1.1 Swedish BBAN account (danskebank)', ()=>{
            chai.expect(validation.validate({clearingNumber:'1281', accountNumber: '1122001'})).to.deep.equal({
                'valid': true,
                reason: null
            })
        })
        it('should validate a valid type 1.2 Swedish BBAN account (Dnb)', ()=>{
            chai.expect(validation.validate({clearingNumber:'9195', accountNumber: '1122005'})).to.deep.equal({
                'valid': true,
                reason: null
            })
        })
        it('should validate a valid type 1.2 Swedish BBAN account (Lansforsakringer WASA Bank)', ()=>{
            chai.expect(validation.validate({clearingNumber:'9023', accountNumber: '1122006'})).to.deep.equal({
                'valid': true,
                reason: null
            })
        })
        it('should validate a valid type 2.1 Swedish BBAN account (Sparebanken syd)', ()=>{
            chai.expect(validation.validate({clearingNumber:'9570', accountNumber: '9122211007'})).to.deep.equal({
                'valid': true,
                reason: null
            })
        })
        it('should validate a valid type 2.2 Swedish BBAN account (Handelsbanken)', ()=>{
            chai.expect(validation.validate({clearingNumber:'6000', accountNumber: '112221009'})).to.deep.equal({
                'valid': true,
                reason: null
            })
        })
        it('should validate a valid type 2.3 Swedish BBAN account (Swedbank)', ()=>{
            chai.expect(validation.validate({clearingNumber:'8388', accountNumber: '1122211004'})).to.deep.equal({
                'valid': true,
                reason: null
            })
        })

        xit('should invalidate an invalid Swedish BBAN account', ()=>{
            chai.expect(validation.validate({clearingNumber:'5440', accountNumber: '1122004'})).to.deep.equal({
                'valid': false,
                reason: "Invalid Swedish bban"
            })
        })

        xit('should invalidate an unknown clearing number in a Swedish BBAN account (type 0.0)', ()=>{
            chai.expect(validation.validate({clearingNumber:'9030', accountNumber: '7777777'})).to.deep.equal({
                valid: false,
                reason: "Invalid Swedish bban"
            })
        })

        xit('should invalidate a Swedish BBAN account with invalid syntax', ()=>{
            chai.expect(validation.validate({clearingNumber:'5440', accountNumber: '88888888'})).to.deep.equal({
                valid: false,
                reason: 'Invalid swedish syntax. Number must be 11, 13 or 14 digits long (incl clearing number)'
            })
        })

        it('should not validate a Swedish BBAN account if clearing number is specified', ()=>{
            chai.expect(validation.validate({clearingNumber:'yoMan', accountNumber: '88888888'})).to.deep.equal({
                valid: true,
                reason: null
            })
        })
    })

    describe('when determining suitability', ()=> {
        it('should accept a Swedish country', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'SE', type: 'bban'})).to.equal(true)
        })
        it('should not accept a norwegian country', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'NO', type: 'bban'})).to.equal(false)
        })

        it('should not accept a type different from bban', ()=>{
            chai.expect(validation.canValidate({accountNumber: 'invalid', countryCode: 'SE', type: 'iban'})).to.equal(false)
        })
    })
})

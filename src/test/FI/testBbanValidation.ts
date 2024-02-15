import * as chai from 'chai'
import { FI_BbanValidation } from '../../validators/FI_BbanValidation'

describe('FI_BbanValidation', () => {
    let validation: FI_BbanValidation
    beforeEach(() => {
        validation = new FI_BbanValidation({})
    })

    describe('when validating', () => {
        it('should validate a valid German BBAN account as object input', () => {
            chai.expect(
                validation.validate({ accountNumber: '12345600000785' })
            ).to.deep.equal({
                valid: true,
                reason: null,
            })
        })

        it('should invalidate an invalid Danish BBAN account', () => {
            chai.expect(
                validation.validate({ accountNumber: '1234560000078' })
            ).to.deep.equal({
                valid: false,
                reason: 'Number does not contain 14 digits',
            })
        })
    })

    describe('when determining suitability', () => {
        it('should accept a finnish country', () => {
            chai.expect(
                validation.canValidate({
                    accountNumber: 'invalid',
                    countryCode: 'FI',
                    type: 'bban',
                })
            ).to.equal(true)
        })
        it('should not accept a swedish country', () => {
            chai.expect(
                validation.canValidate({
                    accountNumber: 'invalid',
                    countryCode: 'SE',
                    type: 'bban',
                })
            ).to.equal(false)
        })

        it('should not accept a type different from bban', () => {
            chai.expect(
                validation.canValidate({
                    accountNumber: 'invalid',
                    type: 'iban',
                })
            ).to.equal(false)
        })
    })
})

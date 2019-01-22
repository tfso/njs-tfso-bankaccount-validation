"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const IbanValidation_1 = require("../src/validators/IbanValidation");
describe('IbanValidation', () => {
    let validation;
    beforeEach(() => {
        validation = new IbanValidation_1.IbanValidation({});
    });
    describe('when validating', () => {
        it('should validate a valid IBAN as string input', () => {
            chai.expect(validation.validate('DK5750510001322617')).to.deep.equal({
                'valid': true
            });
        });
        it('should validate a valid IBAN as object input', () => {
            chai.expect(validation.validate({ accountNumber: 'DK5750510001322617' })).to.deep.equal({
                'valid': true
            });
        });
        it('should invalidate an invalid IBAN', () => {
            chai.expect(validation.validate('DK5750510001322618')).to.deep.equal({
                'valid': false
            });
        });
    });
    describe('when determining suitability', () => {
        it('should accept a syntactically valid IBAN', () => {
            chai.expect(validation.canValidate({ accountNumber: 'DK5750510001322618' })).to.equal(true);
        });
        it('should accept a syntactically invalid IBAN only if type is not set', () => {
            chai.expect(validation.canValidate({ accountNumber: '9DK5750510001322618' })).to.equal(true);
        });
        it('should not accept a type different from iban', () => {
            chai.expect(validation.canValidate({ accountNumber: 'DK5750510001322618', type: 'bban' })).to.equal(false);
        });
    });
});
//# sourceMappingURL=testIbanValidation.js.map
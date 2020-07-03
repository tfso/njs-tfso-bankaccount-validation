"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const DanishBbanValidation_1 = require("../../src/validators/DanishBbanValidation");
describe('DanishBbanValidation', () => {
    let validation;
    beforeEach(() => {
        validation = new DanishBbanValidation_1.DanishBbanValidation({});
    });
    describe('when validating', () => {
        it('should validate a valid Danish BBAN account as object input', () => {
            chai.expect(validation.validate({ accountNumber: '00400440116243' })).to.deep.equal({
                valid: true,
                reason: null
            });
        });
        it('should invalidate an invalid Danish BBAN account', () => {
            chai.expect(validation.validate({ accountNumber: '004004401169243' })).to.deep.equal({
                valid: false,
                reason: 'Number does not contain 14 digits'
            });
        });
    });
    describe('when determining suitability', () => {
        it('should accept a danish country', () => {
            chai.expect(validation.canValidate({ accountNumber: 'invalid', countryCode: 'DK', type: 'bban' })).to.equal(true);
        });
        it('should not accept a swedish country', () => {
            chai.expect(validation.canValidate({ accountNumber: 'invalid', countryCode: 'SE', type: 'bban' })).to.equal(false);
        });
        it('should not accept a type different from bban', () => {
            chai.expect(validation.canValidate({ accountNumber: 'invalid', type: 'iban' })).to.equal(false);
        });
    });
});
//# sourceMappingURL=testBbanValidation.js.map
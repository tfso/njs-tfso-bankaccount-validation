"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const SwedishBbanValidation_1 = require("../../src/validators/SwedishBbanValidation");
describe('SwedishBbanValidation', () => {
    let validation;
    beforeEach(() => {
        validation = new SwedishBbanValidation_1.SwedishBbanValidation({});
    });
    describe('when validating', () => {
        it('should invalidate an unknown clearing number in a Swedish BBAN account (type 0.0)', () => {
            chai.expect(validation.validate({ accountNumber: '90307777777' })).to.deep.equal({
                valid: false,
                reason: "Invalid Swedish bban"
            });
        });
        it('should invalidate a Swedish BBAN account with invalid syntax', () => {
            chai.expect(validation.validate({ accountNumber: '544088888888' })).to.deep.equal({
                valid: false,
                reason: 'Invalid swedish syntax. Number must be 11, 13 or 14 digits long'
            });
        });
    });
    describe('when determining suitability', () => {
        it('should accept a Swedish country', () => {
            chai.expect(validation.canValidate({ accountNumber: 'invalid', countryCode: 'SE', type: 'bban' })).to.equal(true);
        });
        it('should not accept a norwegian country', () => {
            chai.expect(validation.canValidate({ accountNumber: 'invalid', countryCode: 'NO', type: 'bban' })).to.equal(false);
        });
        it('should not accept a type different from bban', () => {
            chai.expect(validation.canValidate({ accountNumber: 'invalid', countryCode: 'SE', type: 'iban' })).to.equal(false);
        });
    });
});
//# sourceMappingURL=testBbanValidation.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const SwedishBankgiroValidation_1 = require("../../src/validators/SwedishBankgiroValidation");
describe('SwedishBankgiroValidation', () => {
    let validation;
    beforeEach(() => {
        validation = new SwedishBankgiroValidation_1.SwedishBankgiroValidation({});
    });
    describe('when validating', () => {
        it('should validate a valid bankgiro account number as string input', () => {
            chai.expect(validation.validate('1234-1234')).to.deep.equal({
                'valid': true
            });
        });
        it('should validate a valid bankgiro account number as object input', () => {
            chai.expect(validation.validate({ accountNumber: '123-1234' })).to.deep.equal({
                'valid': true
            });
        });
        it('should invalidate an invalid bankgiro account number', () => {
            chai.expect(validation.validate('12345-1234')).to.deep.equal({
                'valid': false
            });
        });
    });
    describe('when determining suitability', () => {
        it('should accept a swedish country', () => {
            chai.expect(validation.canValidate({ accountNumber: 'invalid', countryCode: 'SE' })).to.equal(true);
        });
        it('should not accept a norwegian country', () => {
            chai.expect(validation.canValidate({ accountNumber: 'invalid', countryCode: 'NO' })).to.equal(false);
        });
        it('should not accept a type different from bankgiro', () => {
            chai.expect(validation.canValidate({ accountNumber: 'invalid', countryCode: 'SE', type: 'bban' })).to.equal(false);
        });
    });
});
//# sourceMappingURL=testSwedishBankgiroValidation.js.map
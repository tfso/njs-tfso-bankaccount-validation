"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const SwedishPlusgiroValidation_1 = require("../../src/validators/SwedishPlusgiroValidation");
describe('SwedishPlusgiroValidation', () => {
    let validation;
    beforeEach(() => {
        validation = new SwedishPlusgiroValidation_1.SwedishPlusgiroValidation({});
    });
    describe('when validating', () => {
        it('should invalidate a plusgiro account number when not passing mod 10 sum check', () => {
            chai.expect(validation.validate({ accountNumber: '4-3', countryCode: 'SE' })).to.deep.equal({
                valid: false,
                reason: "Account number does not pass the sum check"
            });
        });
        it('should validate a plusgiro account number with format X-Y', () => {
            chai.expect(validation.validate({ accountNumber: '4-2', countryCode: 'SE' })).to.deep.equal({
                valid: true,
                reason: null
            });
        });
        it('should validate a plusgiro account number with format XX-Y', () => {
            chai.expect(validation.validate({ accountNumber: '22-4', countryCode: 'SE' })).to.deep.equal({
                valid: true,
                reason: null
            });
        });
        it('should validate a plusgiro account number with format XXX-Y', () => {
            chai.expect(validation.validate({ accountNumber: '333-5', countryCode: 'SE' })).to.deep.equal({
                valid: true,
                reason: null
            });
        });
        it('should validate a plusgiro account number with format XXXX-Y', () => {
            chai.expect(validation.validate({ accountNumber: '4444-6', countryCode: 'SE' })).to.deep.equal({
                valid: true,
                reason: null
            });
        });
        it('should validate a plusgiro account number with format XXXXX-Y', () => {
            chai.expect(validation.validate({ accountNumber: '55555-7', countryCode: 'SE' })).to.deep.equal({
                valid: true,
                reason: null
            });
        });
        it('should validate a plusgiro account number with format XXXXXX-Y', () => {
            chai.expect(validation.validate({ accountNumber: '666666-3', countryCode: 'SE' })).to.deep.equal({
                valid: true,
                reason: null
            });
        });
        it('should validate a plusgiro account number with format XXXXXXX-Y', () => {
            chai.expect(validation.validate({ accountNumber: '7777777-9', countryCode: 'SE' })).to.deep.equal({
                valid: true,
                reason: null
            });
        });
        it('should validate a valid plusgiro account number as object input', () => {
            chai.expect(validation.validate({ accountNumber: '1234567-4', countryCode: 'SE' })).to.deep.equal({
                valid: true,
                reason: null
            });
        });
        it('should invalidate an invalid plusgiro account number', () => {
            chai.expect(validation.validate({ accountNumber: '12345678-2', countryCode: 'SE' })).to.deep.equal({
                valid: false,
                reason: "Account number does not match the Swedish plus giro format. Valid format is \"XXXXX(X(X)))-X\""
            });
        });
        it('should invalidate a non swedish country', () => {
            chai.expect(validation.validate({ accountNumber: 'invalid', countryCode: 'NO' })).to.deep.equal({
                valid: false,
                reason: 'Plus giro account type require country code to be SE. Received: NO'
            });
        });
    });
    describe('when determining suitability', () => {
        it('should accept plusgiro', () => {
            chai.expect(validation.canValidate({ accountNumber: 'invalid', countryCode: 'NO', type: 'plusgiro' }))
                .to.equal(true);
        });
        it('should not accept a type different from plusgiro', () => {
            chai.expect(validation.canValidate({ accountNumber: 'invalid', countryCode: 'SE', type: 'bban' }))
                .to.equal(false);
        });
    });
});
//# sourceMappingURL=testSwedishPlusgiroValidation.js.map
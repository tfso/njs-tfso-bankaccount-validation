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
        // it('should validate a valid bankgiro account number as string input', ()=>{
        //     chai.expect(validation.validate('1234-1234')).to.deep.equal({
        //         valid: true,
        //         reason: null
        //     })
        // })
        it('should validate a valid bankgiro account number as object input', () => {
            chai.expect(validation.validate({ accountNumber: '123-1234', countryCode: 'SE' })).to.deep.equal({
                valid: true,
                reason: null
            });
        });
        it('should invalidate an invalid bankgiro account number', () => {
            chai.expect(validation.validate({ accountNumber: '12345-1234', countryCode: 'SE' })).to.deep.equal({
                valid: false,
                reason: 'Number does not match the Swedish bank giro syntax'
            });
        });
        it('should invalidate a non swedish country', () => {
            chai.expect(validation.validate({ accountNumber: 'invalid', countryCode: 'NO' })).to.deep.equal({
                valid: false,
                reason: "Bank giro account type require country code to be SE. Received: NO"
            });
        });
    });
    describe('when determining suitability', () => {
        it('should accept bankgiro', () => {
            chai.expect(validation.canValidate({ accountNumber: 'invalid', countryCode: 'NO', type: 'bankgiro' }))
                .to.equal(true);
        });
        it('should not accept a type different from bankgiro', () => {
            chai.expect(validation.canValidate({ accountNumber: 'invalid', countryCode: 'SE', type: 'bban' }))
                .to.equal(false);
        });
    });
});
//# sourceMappingURL=testSwedishBankgiroValidation.js.map
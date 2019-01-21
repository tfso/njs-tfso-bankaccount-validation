"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const src_1 = require("../src");
const IbanValidation_1 = require("../src/validators/IbanValidation");
describe('BankAccountValidation', () => {
    describe('when adding validators', () => {
        it('it should be used to validate an account', () => {
            let bankAccountValidation = new src_1.BankAccountValidation({});
            bankAccountValidation.add(new IbanValidation_1.IbanValidation({}));
            chai.expect(bankAccountValidation.validate('DK5750510001322617')).to.deep.equal([{
                    'valid': true
                }]);
        });
        it('it should be used to invalidate an account', () => {
            let bankAccountValidation = new src_1.BankAccountValidation({});
            bankAccountValidation.add(new IbanValidation_1.IbanValidation({}));
            chai.expect(bankAccountValidation.validate('DK5750510001322618')).to.deep.equal([{
                    'valid': false
                }]);
        });
    });
});
//# sourceMappingURL=testBankAccountValidation.js.map
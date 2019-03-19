"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const src_1 = require("../src");
const IbanValidation_1 = require("../src/validators/IbanValidation");
const AcceptValidation_1 = require("../src/validators/AcceptValidation");
const RejectValidation_1 = require("../src/validators/RejectValidation");
const types_1 = require("../src/types");
describe('BankAccountValidation', () => {
    describe('when adding validators', () => {
        it('should be used to validate an account', () => {
            let bankAccountValidation = new src_1.BankAccountValidation({});
            bankAccountValidation.addStrict(new IbanValidation_1.IbanValidation({}));
            chai.expect(bankAccountValidation.validate('DK5750510001322617')).to.deep.equal({
                valid: true,
                reasons: []
            });
        });
        it('should be used to invalidate an account', () => {
            let bankAccountValidation = new src_1.BankAccountValidation({});
            bankAccountValidation.addStrict(new IbanValidation_1.IbanValidation({}));
            chai.expect(bankAccountValidation.validate('DK5750510001322618')).to.deep.equal({
                valid: false,
                reasons: []
            });
        });
    });
    describe('when using acceptance type allAccept', () => {
        it('should invalidate when there is one that invalidates', () => {
            let bankAccountValidation = new src_1.BankAccountValidation({ acceptanceType: types_1.AcceptanceType.all });
            bankAccountValidation.add(new AcceptValidation_1.AcceptValidation());
            bankAccountValidation.add(new RejectValidation_1.RejectValidation());
            chai.expect(bankAccountValidation.validate({ accountNumber: '' })).to.deep.equal({
                valid: false,
                reasons: []
            });
        });
        it('should validate when all validates', () => {
            let bankAccountValidation = new src_1.BankAccountValidation({ acceptanceType: types_1.AcceptanceType.all });
            bankAccountValidation.add(new AcceptValidation_1.AcceptValidation());
            bankAccountValidation.add(new AcceptValidation_1.AcceptValidation());
            chai.expect(bankAccountValidation.validate({ accountNumber: '' })).to.deep.equal({
                valid: true,
                reasons: []
            });
        });
        it('should return null when no usable validators is found', () => {
            let bankAccountValidation = new src_1.BankAccountValidation({ acceptanceType: types_1.AcceptanceType.all });
            chai.expect(bankAccountValidation.validate({ accountNumber: '' })).to.deep.equal({
                valid: undefined,
                reasons: []
            });
        });
    });
    describe('when using acceptance type someAccept', () => {
        it('should invalidate when all invalidates', () => {
            let bankAccountValidation = new src_1.BankAccountValidation({ acceptanceType: types_1.AcceptanceType.some });
            bankAccountValidation.add(new RejectValidation_1.RejectValidation());
            bankAccountValidation.add(new RejectValidation_1.RejectValidation());
            chai.expect(bankAccountValidation.validate({ accountNumber: '' })).to.deep.equal({
                valid: false,
                reasons: []
            });
        });
        it('should validate when some validates', () => {
            let bankAccountValidation = new src_1.BankAccountValidation({ acceptanceType: types_1.AcceptanceType.some });
            bankAccountValidation.add(new AcceptValidation_1.AcceptValidation());
            bankAccountValidation.add(new RejectValidation_1.RejectValidation());
            chai.expect(bankAccountValidation.validate({ accountNumber: '' })).to.deep.equal({
                valid: true,
                reasons: []
            });
        });
        it('should return null when no usable validators is found', () => {
            let bankAccountValidation = new src_1.BankAccountValidation({ acceptanceType: types_1.AcceptanceType.some });
            chai.expect(bankAccountValidation.validate({ accountNumber: '' })).to.deep.equal({
                valid: undefined,
                reasons: []
            });
        });
    });
});
//# sourceMappingURL=testBankAccountValidation.js.map
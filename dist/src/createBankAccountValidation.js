"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const SwedishBankgiroValidation_1 = require("./validators/SwedishBankgiroValidation");
const SwedishPlusgiroValidation_1 = require("./validators/SwedishPlusgiroValidation");
const SwedishBbanValidation_1 = require("./validators/SwedishBbanValidation");
const NorwegianBbanValidation_1 = require("./validators/NorwegianBbanValidation");
const IbanValidation_1 = require("./validators/IbanValidation");
function createValidationWithAllAvailableValidators(config) {
    let bankAccountValidation = new src_1.BankAccountValidation(config);
    bankAccountValidation.add(new IbanValidation_1.IbanValidation(config));
    bankAccountValidation.add(new SwedishBankgiroValidation_1.SwedishBankgiroValidation(config));
    bankAccountValidation.add(new SwedishPlusgiroValidation_1.SwedishPlusgiroValidation(config));
    bankAccountValidation.add(new SwedishBbanValidation_1.SwedishBbanValidation(config));
    bankAccountValidation.add(new NorwegianBbanValidation_1.NorwegianBbanValidation(config));
    return bankAccountValidation;
}
exports.createValidationWithAllAvailableValidators = createValidationWithAllAvailableValidators;
//# sourceMappingURL=createBankAccountValidation.js.map
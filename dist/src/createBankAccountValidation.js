"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const SwedishBankgiroValidation_1 = require("./validators/SwedishBankgiroValidation");
const SwedishPlusgiroValidation_1 = require("./validators/SwedishPlusgiroValidation");
const SwedishBbanValidation_1 = require("./validators/SwedishBbanValidation");
const NorwegianBbanValidation_1 = require("./validators/NorwegianBbanValidation");
const IbanValidation_1 = require("./validators/IbanValidation");
const DanishBbanValidation_1 = require("./validators/DanishBbanValidation");
// import {SyntaxValidation} from "./validators/SyntaxValidation"
function createValidationWithAllAvailableValidators(config) {
    let bankAccountValidation = new src_1.BankAccountValidation(config);
    // bankAccountValidation.add(new SyntaxValidation(config))
    bankAccountValidation.addStrict(new IbanValidation_1.IbanValidation(config));
    bankAccountValidation.addStrict(new SwedishBankgiroValidation_1.SwedishBankgiroValidation(config));
    bankAccountValidation.addStrict(new SwedishPlusgiroValidation_1.SwedishPlusgiroValidation(config));
    bankAccountValidation.addStrict(new SwedishBbanValidation_1.SwedishBbanValidation(config));
    bankAccountValidation.addStrict(new NorwegianBbanValidation_1.NorwegianBbanValidation(config));
    bankAccountValidation.addStrict(new DanishBbanValidation_1.DanishBbanValidation(config));
    return bankAccountValidation;
}
exports.createValidationWithAllAvailableValidators = createValidationWithAllAvailableValidators;
//# sourceMappingURL=createBankAccountValidation.js.map
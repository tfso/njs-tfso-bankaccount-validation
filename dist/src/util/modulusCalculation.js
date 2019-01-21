"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function normaizeWeights(weights, length) {
    let _weights = weights;
    while (_weights.length < length) {
        _weights = _weights.concat(weights);
    }
    while (_weights.length > length) {
        _weights.shift();
    }
    return _weights;
}
function calculate(number, weights, postProcess = (n) => n) {
    weights = normaizeWeights(weights, number.length);
    let sum = 0;
    for (let i = 0; i < number.length; i++) {
        sum += postProcess(parseInt(number[i]) * weights[i]);
    }
    return sum;
}
exports.calculate = calculate;
function modulusValidation(sum, modulus) {
    let modValue = sum / modulus;
    return (modValue - Math.floor(modValue)) === 0;
}
exports.modulusValidation = modulusValidation;
//# sourceMappingURL=modulusCalculation.js.map
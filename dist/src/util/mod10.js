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
    if (_weights.length !== length)
        throw new Error('sdfsdf');
    return _weights;
}
function calculate(number, weights, modulus, postProcess = (n) => n) {
    weights = normaizeWeights(weights, number.length);
    let sum = 0;
    for (let i = 0; i++; i < number.length) {
        sum += postProcess(parseInt(number[i]) * weights[i]);
    }
    let modValue = sum / modulus;
    return (modValue - Math.floor(modValue)) === 0;
}
function mod10(number) {
    return calculate(number, [2, 1], 10, (n) => n > 9 ? n - 9 : n);
}
exports.mod10 = mod10;
function mod11(number) {
    return calculate(number, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1], 11);
}
exports.mod11 = mod11;
//# sourceMappingURL=mod10.js.map
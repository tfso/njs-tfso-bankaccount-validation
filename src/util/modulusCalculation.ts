function normaizeWeights(weights: number[], length: number) {
    let _weights = weights
    while (_weights.length < length) {
        _weights = _weights.concat(weights)
    }
    while (_weights.length > length) {
        _weights.shift()
    }

    return _weights
}

export function calculate(
    number: string,
    weights: number[],
    postProcess: any = (n: any) => n
) {
    weights = normaizeWeights(weights, number.length)

    let sum: number = 0
    for (let i: number = 0; i < number.length; i++) {
        sum += postProcess(parseInt(number[i]) * weights[i])
    }

    return sum
}

export function modulusValidation(sum: number, modulus: number) {
    const modValue = sum / modulus
    return modValue - Math.floor(modValue) === 0
}

const {createValidationWithAllAvailableValidators} = require('../dist/src/index')
let bankAccountValidation  = createValidationWithAllAvailableValidators({})

function calculate(countryCode, accountNumber, type, resultFunc=console.log) {
    let result = bankAccountValidation.validate({
        countryCode,
        accountNumber,
        type
    })
    resultFunc([countryCode, accountNumber, (type+':    ').substring(0,9), (result.valid ? 'is OK ' : 'not OK'), result.reasons.join('. ')].join('\t'))
}
function calculateNext(countryCode, accountNumber, type, digits=3, resultFunc=console.log) {
    let result
    let number = accountNumber.substr(0,accountNumber.length-digits)
    for (let i = 0; i<1000; i++){
        accountNumber = number+('00' + i).substr(-digits)
        result = bankAccountValidation.validate({
            countryCode,
            accountNumber,
            type
        })
        if (result.valid) break;
    }
    resultFunc([countryCode, accountNumber, (type+':    ').substring(0,9), (result.valid ? 'is OK ' : 'not OK'), result.reasons.join('. ')].join('\t'))
}

module.exports = {
    calculate,
    calculateNext
}
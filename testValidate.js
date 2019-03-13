const {createValidationWithAllAvailableValidators} = require('./dist/src/index')
let bankAccountValidation  = createValidationWithAllAvailableValidators({})


function calculate(countryCode, accountNumber, type) {
    console.log([countryCode, accountNumber, type+':', (bankAccountValidation.validate({
        countryCode,
        accountNumber,
        type
    }) ? 'OK' : 'not OK')].join('\t'))
}
function calculateNext(countryCode, accountNumber, type) {
    let b
    let number = accountNumber.substr(0,accountNumber.length-1)
    for (let i = 0; i<10; i++){
        accountNumber = number+i
        b = bankAccountValidation.validate({
            countryCode,
            accountNumber,
            type
        })
        if (b) break;
    }
    console.log([countryCode, accountNumber, type+':', (b ? 'OK' : 'not OK')].join('\t'))
}

calculate('SE', '1111-1116', 'bankgiro')
calculateNext('NO', '11112233333', 'bban')
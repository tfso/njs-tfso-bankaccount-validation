const {createValidationWithAllAvailableValidators} = require('./dist/src/index')
let bankAccountValidation  = createValidationWithAllAvailableValidators({})


function calculate(countryCode, accountNumber, type) {
    let result = bankAccountValidation.validate({
        countryCode,
        accountNumber,
        type
    })
    console.log([countryCode, accountNumber, (type+':    ').substring(0,9), (result.valid ? 'is OK ' : 'not OK'), result.reasons.join('. ')].join('\t'))
}
function calculateNext(countryCode, accountNumber, type,digits=3) {
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
    console.log([countryCode, accountNumber, (type+':    ').substring(0,9), (result.valid ? 'is OK ' : 'not OK'), result.reasons.join('. ')].join('\t'))
}

calculate('SE', '1111-1116', 'bankgiro')
calculate('NO', '75961112610', 'bban')
calculateNext('SE', '55555-1', 'plusgiro', 1)
calculateNext('NO', '22223344444', 'bban')
calculateNext('SE', '77777777777', 'bban')
calculateNext('NO', 'NO2144442211170', 'iban')
calculateNext('NO', 'NO2144442211560', 'iban', 2)
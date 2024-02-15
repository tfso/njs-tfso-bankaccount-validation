/* eslint-disable */
const { calculateNext } = require('./helpers')

for (let i = 0; i < 100; i++) {
    calculateNext('NO', '999999' + ('0000' + i).substr(-2) + '000', 'bban', 2)
}
for (let i = 0; i < 100; i++) {
    calculateNext('SE', '69999999' + ('0000' + i).substr(-2) + '000', 'bban', 2)
}
for (let i = 0; i < 100; i++) {
    calculateNext(
        'GB',
        'GB' + ('0000' + i).substr(-2) + 'AAAA99999999999999' + '',
        'iban',
        2
    )
}
for (let i = 0; i < 100; i++) {
    calculateNext(
        'DE',
        'DE' + ('0000' + i).substr(-2) + '999999999999999999' + '',
        'iban',
        2
    )
}
for (let i = 0; i < 100; i++) {
    calculateNext(
        'DK',
        'DK' + ('0000' + i).substr(-2) + '99999999999999' + '',
        'iban',
        2
    )
}
for (let i = 0; i < 100; i++) {
    calculateNext(
        'NO',
        'NO' + ('0000' + i).substr(-2) + '99999999999' + '',
        'iban',
        2
    )
}
for (let i = 0; i < 100; i++) {
    calculateNext(
        'SE',
        'SE' + ('0000' + i).substr(-2) + '99999999999999999999' + '',
        'iban',
        2
    )
}

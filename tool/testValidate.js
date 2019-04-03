const {calculate, calculateNext} = require('./helpers')

calculate('SE', '1111-1116', 'bankgiro')
calculate('NO', '75961112610', 'bban')
calculateNext('SE', '55555-1', 'plusgiro', 1)
calculateNext('NO', '22223344444', 'bban')
calculateNext('SE', '77777777777', 'bban')
calculateNext('NO', 'NO2144442211170', 'iban')
calculateNext('NO', 'NO2144442211560', 'iban', 2)
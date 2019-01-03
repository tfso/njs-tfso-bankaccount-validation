import * as chai from 'chai'
import {BankAccountValidation} from '../src'
import {IbanValidation} from '../src/validators/IbanValidation'

describe('BankAccountValidation', ()=> {
    describe('when adding validators', ()=> {
        it('it should be used to validate an account', ()=>{
            let bankAccountValidation = new BankAccountValidation({})
            bankAccountValidation.add(new IbanValidation({}))
            chai.expect(bankAccountValidation.validate('DK5750510001322617')).to.deep.equal([{
                    'valid': true
                }])
        })

        it('it should be used to invalidate an account', ()=>{
            let bankAccountValidation = new BankAccountValidation({})
            bankAccountValidation.add(new IbanValidation({}))
            chai.expect(bankAccountValidation.validate('DK5750510001322618')).to.deep.equal([{
                    'valid': false
                }])
        })
    })
})

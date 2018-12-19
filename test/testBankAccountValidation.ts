import * as chai from 'chai'
// import * as sinonChai from 'sinon-chai'
import {BankAccountValidation} from '../src'
import {IbanValidation} from '../src/validators/IbanValidation'

describe('BankAccountValidation', ()=> {
    describe('when adding validators', ()=> {
        it('it should be used to validate an account', ()=>{
            let a = new BankAccountValidation({a:false})
            a.add(new IbanValidation({}))
            chai.expect(a.validate('DK5750510001322617')).to.deep.equal([
                {
                    'valid': true
                }])
        })

        it('it should be used to invalidate an account', ()=>{
            let a = new BankAccountValidation({a:false})
            a.add(new IbanValidation({}))
            chai.expect(a.validate('DK5750510001322618')).to.deep.equal([
                {
                    'valid': false
                }])
        })
    })
})

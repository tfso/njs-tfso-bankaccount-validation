import * as chai from 'chai'
import {BankAccountValidation} from '../src'
import {IbanValidation} from '../src/IbanValidation'

describe("BankAccountValidation", ()=> {
    describe("when adding validators", ()=> {
        it('it should be used', ()=>{
            let a = new BankAccountValidation({a:false})
            a.add(new IbanValidation({}))
        })

        it('should ...', ()=>{
            let a = new BankAccountValidation({a:false})
            chai.expect(a.validate("")).to.deep.equal([])
        })
    })
})

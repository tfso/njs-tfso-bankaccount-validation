import * as chai from 'chai'

describe("Something", ()=> {
    it('should execute a simple test', ()=>{
        console.log('Hello')
    })

    it('should fail', ()=>{
        chai.expect(() => {throw new Error("failing")}).to.throw()
    })
})

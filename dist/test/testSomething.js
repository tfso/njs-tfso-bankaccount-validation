"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
describe('Something', () => {
    it('should execute a simple test', () => {
        console.log('Hello');
    });
    it('should fail', () => {
        chai.expect(() => { throw new Error('failing'); }).to.throw();
    });
});
//# sourceMappingURL=testSomething.js.map
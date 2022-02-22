"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standarizeInput = void 0;
// export function standarizeInput(input: string | ValidationInput):ValidationInput {
//     const result:ValidationInput
//     if (typeof input === "string") {
//         result = {
//             accountNumber: input
//         }
//     } else {
//         result = input
//     }
//     return result
// }
function standarizeInput(input, type) {
    if (typeof input === "string") {
        input = {
            accountNumber: input,
            clearingNumber: null,
            type
        };
    }
    return { clearingNumber: null, ...input };
}
exports.standarizeInput = standarizeInput;
//# sourceMappingURL=standarizeInput.js.map
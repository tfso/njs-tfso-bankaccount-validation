"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export function standarizeInput(input: string | ValidationInput):ValidationInput {
//     let result:ValidationInput
//     if (typeof input === "string") {
//         result = {
//             accountNumber: input
//         }
//     } else {
//         result = input
//     }
//     return result
// }
function standarizeInput(input) {
    if (typeof input === "string") {
        input = {
            accountNumber: input
        };
    }
    return input;
}
exports.standarizeInput = standarizeInput;
//# sourceMappingURL=standarizeInput.js.map
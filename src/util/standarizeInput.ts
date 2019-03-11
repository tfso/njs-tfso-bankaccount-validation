import {ValidationInput} from "../types"

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

export function standarizeInput(input: string | ValidationInput, type:string):ValidationInput {
    if (typeof input === "string") {
        input = {
            accountNumber: input,
            type
        }
    }
    return input
}
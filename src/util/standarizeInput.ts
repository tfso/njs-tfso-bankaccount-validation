import { ValidationInput } from '../types'

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

export function standarizeInput(
    input: string | ValidationInput,
    type: string
): ValidationInput {
    if (typeof input === 'string') {
        input = {
            accountNumber: input,
            clearingNumber: null,
            type,
        }
    }
    return { clearingNumber: null, ...input }
}

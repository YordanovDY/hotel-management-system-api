import { ZodFormattedError } from "zod";

export function extractErrorMessage<DataType>(errorObject: ZodFormattedError<DataType, string>): string {
    let errorMsg = '/* ';

    for (const property in errorObject) {
        if (property === '_errors') {
            continue;
        }

        const field = errorObject[property as keyof typeof errorObject];

        const isValidError = field && typeof field === 'object' && '_errors' in field && Array.isArray((field as any)._errors);

        if (isValidError) {
            const errors = (field as { _errors: string[] })._errors;
            const msg = errors.join(', ');
            errorMsg += `${property}: ${msg} // `;
        }
    }


    if (errorMsg.endsWith('// ')) {
        const errorMsgLength = errorMsg.length;

        errorMsg = errorMsg.substring(0, errorMsgLength - 3);
        errorMsg += '*/';
    }

    return errorMsg;
}
import { HttpStatusCodes } from "../interfaces/HttpStatusCodes";
import { IDomainError } from "../interfaces/IDomainError";

/**
 * Generic error handler for all use cases
 * Handles DomainErrors, database errors, and unexpected errors
 */
export function useCaseErrorHandler(error: any): {
    success: false;
    error: {
        type: string;
        message: string;
        statusCode: number;
    };
} {

    if (isDomainError(error)) {
        return {
            success: false,
            error: {
                type: error.type,
                message: error.message,
                statusCode: error.statusCode,
            }
        };
    }

    if (isDatabaseError(error)) {
        return handleDatabaseError(error);
    }

    return {
        success: false,
        error: {
            type: "UNEXPECTED_ERROR",
            message: "An unexpected error occurred",
            statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
        }
    };
}

/**
 * Type guard for DomainError
 */
function isDomainError(error: any): error is IDomainError<string> {
    return error &&
        typeof error.type === 'string' &&
        typeof error.message === 'string' &&
        typeof error.statusCode === 'number';
}

/**
 * Type guard for database errors
 */
function isDatabaseError(error: any): boolean {
    return error?.code && (
        error.code === "P2002" ||   
        error.code === "23505" ||     
        error.code?.includes("ER_DUP_ENTRY") || 
        error.code?.includes("SQLITE_CONSTRAINT")
    );
}

/**
 * Handle database-specific errors
 */
function handleDatabaseError(error: any): {
    success: false;
    error: {
        type: string;
        message: string;
        statusCode: number;
    };
} {
    return {
        success: false,
        error: {
            type: "DATABASE_ERROR",
            message: "Database constraint violation",
            statusCode: HttpStatusCodes.CONFLICT,
        }
    };
}
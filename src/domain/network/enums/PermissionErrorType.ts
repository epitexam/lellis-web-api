import { HttpStatusCodes } from "../../../application/interfaces/HttpStatusCodes";
import { DomainError, IDomainError } from "../../../application/interfaces/IDomainError";

/**
 * Permission-specific error types.
 */
export enum PermissionErrorType {
    EMPTY_ACTION = "Permission action cannot be empty.",
    EMPTY_RESOURCE = "Permission resource cannot be empty.",
    INVALID_ACTION_FORMAT = "Invalid permission action format (must be uppercase letters and underscores).",
    INVALID_RESOURCE_FORMAT = "Invalid permission resource format (must be uppercase letters and underscores).",
    DUPLICATE_PERMISSION = "Permission already exists.",
    PERMISSION_NOT_FOUND = "Permission not found.",
    DATABASE_ERROR = "Database error occurred while handling permissions.",
    UNEXPECTED_ERROR = "An unexpected error occurred while processing permission logic."
}

/**
 * Map each PermissionErrorType to an HTTP status code.
 */
export const PermissionErrorHttpStatus: Record<PermissionErrorType, number> = {
    [PermissionErrorType.EMPTY_ACTION]: HttpStatusCodes.BAD_REQUEST,
    [PermissionErrorType.EMPTY_RESOURCE]: HttpStatusCodes.BAD_REQUEST,
    [PermissionErrorType.INVALID_ACTION_FORMAT]: HttpStatusCodes.BAD_REQUEST,
    [PermissionErrorType.INVALID_RESOURCE_FORMAT]: HttpStatusCodes.BAD_REQUEST,
    [PermissionErrorType.DUPLICATE_PERMISSION]: HttpStatusCodes.CONFLICT,
    [PermissionErrorType.PERMISSION_NOT_FOUND]: HttpStatusCodes.NOT_FOUND,
    [PermissionErrorType.DATABASE_ERROR]: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    [PermissionErrorType.UNEXPECTED_ERROR]: HttpStatusCodes.INTERNAL_SERVER_ERROR
};

/**
 * Permission-specific domain error class.
 */
export class PermissionError extends DomainError<PermissionErrorType> implements IDomainError<PermissionErrorType> {
    constructor(type: PermissionErrorType) {
        super(type, PermissionErrorHttpStatus);
    }
}
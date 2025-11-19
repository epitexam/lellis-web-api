import { HttpStatusCodes } from "../../../application/interfaces/HttpStatusCodes";
import { DomainError, IDomainError } from "../../../application/interfaces/IDomainError";

/**
 * Role-specific error types.
 */
export enum RoleErrorType {
    EMPTY_ROLE_NAME = "Role name cannot be empty.",
    INVALID_ROLE_NAME_FORMAT = "Invalid role name format (must be uppercase letters and underscores).",
    DUPLICATE_PERMISSION = "Permission already exists in this role.",
    PERMISSION_NOT_FOUND = "Permission not found in this role.",
    DUPLICATE_ROLE = "Role already exists in the network.",
    ROLE_NOT_FOUND = "Role not found in the network.",
    ROLE_IN_USE = "Role is currently assigned to members and cannot be removed.",
    DATABASE_ERROR = "Database error occurred while handling roles.",
    UNEXPECTED_ERROR = "An unexpected error occurred while processing role logic."
}

/**
 * Map each RoleErrorType to an HTTP status code.
 */
export const RoleErrorHttpStatus: Record<RoleErrorType, number> = {
    [RoleErrorType.EMPTY_ROLE_NAME]: HttpStatusCodes.BAD_REQUEST,
    [RoleErrorType.INVALID_ROLE_NAME_FORMAT]: HttpStatusCodes.BAD_REQUEST,
    [RoleErrorType.DUPLICATE_PERMISSION]: HttpStatusCodes.CONFLICT,
    [RoleErrorType.PERMISSION_NOT_FOUND]: HttpStatusCodes.NOT_FOUND,
    [RoleErrorType.DUPLICATE_ROLE]: HttpStatusCodes.CONFLICT,
    [RoleErrorType.ROLE_NOT_FOUND]: HttpStatusCodes.NOT_FOUND,
    [RoleErrorType.ROLE_IN_USE]: HttpStatusCodes.FORBIDDEN,
    [RoleErrorType.DATABASE_ERROR]: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    [RoleErrorType.UNEXPECTED_ERROR]: HttpStatusCodes.INTERNAL_SERVER_ERROR
};

/**
 * Role-specific domain error class.
 */
export class RoleError extends DomainError<RoleErrorType> implements IDomainError<RoleErrorType> {
    constructor(type: RoleErrorType) {
        super(type, RoleErrorHttpStatus);
    }
}

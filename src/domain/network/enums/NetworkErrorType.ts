import { HttpStatusCodes } from "../../../application/interfaces/HttpStatusCodes";
import { DomainError, IDomainError } from "../../../application/interfaces/IDomainError";


/**
 * Network-specific error types.
 */
export enum NetworkErrorType {
    EMPTY_NAME = "Network name cannot be empty.",
    MISSING_ADMIN = "Network must have an admin user.",
    ADMIN_NOT_FOUND = "Admin user not found in the system.",
    DUPLICATE_NETWORK_NAME = "A network with this name already exists.",
    USER_NOT_FOUND = "User is not a member of this network.",
    USER_ALREADY_IN_NETWORK = "User is already a member of this network.",
    CANNOT_REMOVE_ADMIN = "The admin user cannot be removed from the network.",
    RESOURCE_NOT_FOUND = "Resource not found in the network.",
    NAME_ALREADY_USED = "Name already used by another network.",
    DATABASE_ERROR = "A database error occurred while processing the network.",
    UNEXPECTED_ERROR = "An unexpected error occurred while handling the network operation.",
    MISSING_NETWORK_ID = "No network ID was provided.",
    NETWORK_NOT_FOUND = "Network not found.",
    INVALID_NETWORK_ID = "Network ID provided is not a valid UUID.",
    NOT_ALLOWED_TO_PERFORM_ACTION_IN_NETWORK = "You are not allowed to perform this action on this network."
}

/**
 * Map each NetworkErrorType to an HTTP status code.
 */
export const NetworkErrorHttpStatus: Record<NetworkErrorType, number> = {
    [NetworkErrorType.EMPTY_NAME]: HttpStatusCodes.BAD_REQUEST,
    [NetworkErrorType.MISSING_ADMIN]: HttpStatusCodes.BAD_REQUEST,
    [NetworkErrorType.ADMIN_NOT_FOUND]: HttpStatusCodes.NOT_FOUND,
    [NetworkErrorType.DUPLICATE_NETWORK_NAME]: HttpStatusCodes.CONFLICT,
    [NetworkErrorType.USER_NOT_FOUND]: HttpStatusCodes.NOT_FOUND,
    [NetworkErrorType.USER_ALREADY_IN_NETWORK]: HttpStatusCodes.CONFLICT,
    [NetworkErrorType.CANNOT_REMOVE_ADMIN]: HttpStatusCodes.FORBIDDEN,
    [NetworkErrorType.RESOURCE_NOT_FOUND]: HttpStatusCodes.NOT_FOUND,
    [NetworkErrorType.NAME_ALREADY_USED]: HttpStatusCodes.CONFLICT,
    [NetworkErrorType.DATABASE_ERROR]: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    [NetworkErrorType.UNEXPECTED_ERROR]: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    [NetworkErrorType.MISSING_NETWORK_ID]: HttpStatusCodes.BAD_REQUEST,
    [NetworkErrorType.NETWORK_NOT_FOUND]: HttpStatusCodes.NOT_FOUND,
    [NetworkErrorType.INVALID_NETWORK_ID]: HttpStatusCodes.BAD_REQUEST,
    [NetworkErrorType.NOT_ALLOWED_TO_PERFORM_ACTION_IN_NETWORK]: HttpStatusCodes.FORBIDDEN
};

/**
 * Network-specific domain error class.
 */
export class NetworkError extends DomainError<NetworkErrorType> implements IDomainError<NetworkErrorType> {
    constructor(type: NetworkErrorType) {
        super(type, NetworkErrorHttpStatus);
    }
}

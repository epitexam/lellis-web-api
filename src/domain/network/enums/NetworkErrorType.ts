/**
 * @file NetworkErrorType.ts
 * @description
 * Defines network-specific error types and the {@link NetworkError} class.
 * Used to standardize and type errors related to network validation, creation,
 * and mutation within the domain layer.
 *
 * These errors are typically thrown or returned by use cases and entities
 * when business invariants are violated.
 */

/**
 * Enumerates all possible error types related to {@link Network} operations.
 */
export enum NetworkErrorType {
    /** The network name cannot be empty. */
    EMPTY_NAME = "Network name cannot be empty.",

    /** The admin user cannot be null or undefined. */
    MISSING_ADMIN = "Network must have an admin user.",

    /** The provided admin user does not exist in the system. */
    ADMIN_NOT_FOUND = "Admin user not found in the system.",

    /** A network with this name already exists. */
    DUPLICATE_NETWORK_NAME = "A network with this name already exists.",

    /** The user is not a member of this network. */
    USER_NOT_FOUND = "User is not a member of this network.",

    /** The user is already a member of this network. */
    USER_ALREADY_IN_NETWORK = "User is already a member of this network.",

    /** The admin cannot be removed from the network. */
    CANNOT_REMOVE_ADMIN = "The admin user cannot be removed from the network.",

    /** The resource was not found in the network. */
    RESOURCE_NOT_FOUND = "Resource not found in the network.",

    /** The network name is already used. (Alias for backward compatibility.) */
    NAME_ALREADY_USED = "Name already used by a network.",

    /** A database constraint or persistence error occurred. */
    DATABASE_ERROR = "A database error occurred while processing the network.",

    /** An unexpected error occurred that does not match a known case. */
    UNEXPECTED_ERROR = "An unexpected error occurred while handling the network operation.",

    /** An unexpected error occurred when no network id is provided. */
    MISSING_NETWORK_ID = "no network id was provided.",

    /** An unexpected error occurred when no network was found. */
    NETWORK_NOT_FOUND = "Network not found.",

    /** An unexpected error occurred when the network id provided is not a valid uuid. */
    INVALID_NETWORK_ID = "Network id provided is not a valid uuid.",

}

/**
 * Custom domain error for network-related operations.
 *
 * This class allows domain logic and use cases to throw rich,
 * type-safe errors without depending on external libraries.
 *
 * @example
 * ```typescript
 * throw new NetworkError(NetworkErrorType.USER_NOT_FOUND);
 * ```
 */
export class NetworkError extends Error {
    /** The specific type of network error that occurred. */
    public readonly type: NetworkErrorType;

    /**
     * Creates a new instance of {@link NetworkError}.
     * 
     * @param {NetworkErrorType} type - The specific error type.
     */
    constructor(type: NetworkErrorType) {
        super(type);
        this.name = "NetworkError";
        this.type = type;

        // Ensures correct prototype chain for `instanceof` checks.
        Object.setPrototypeOf(this, NetworkError.prototype);
    }
}

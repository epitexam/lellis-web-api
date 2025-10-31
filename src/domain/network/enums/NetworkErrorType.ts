/**
 * @file NetworkErrorType.ts
 * @description
 * Defines network-specific error types and the {@link NetworkError} class.
 * Used to standardize and type errors related to network validation and mutation
 * within the domain layer.
 */

/**
 * Enumerates all possible error types related to {@link Network} operations.
 */
export enum NetworkErrorType {
    /** The network name cannot be empty. */
    EMPTY_NAME = "Network name cannot be empty.",

    /** The admin user cannot be null or undefined. */
    MISSING_ADMIN = "Network must have an admin user.",

    /** The user is not a member of this network. */
    USER_NOT_FOUND = "User is not a member of this network.",

    /** The user is already a member of this network. */
    USER_ALREADY_IN_NETWORK = "User is already a member of this network.",

    /** The admin cannot be removed from the network. */
    CANNOT_REMOVE_ADMIN = "The admin user cannot be removed from the network.",

    /** The resource was not found in the network. */
    RESOURCE_NOT_FOUND = "Resource not found in the network.",

    /** The network name is already used. */
    NAME_ALREADY_USED = "Name already used by a network.",
}

/**
 * Custom domain error for network-related operations.
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
     * @param {NetworkErrorType} type - The specific error type.
     */
    constructor(type: NetworkErrorType) {
        super(type);
        this.name = "NetworkError";
        this.type = type;

        // Ensure correct prototype chain for `instanceof` checks.
        Object.setPrototypeOf(this, NetworkError.prototype);
    }
}
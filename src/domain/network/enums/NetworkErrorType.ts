/**
 * @file NetworkErrorType.ts
 * @description Defines network-specific error types and a custom error class
 * used to standardize error handling within the Network domain.
 */

/**
 * Enumerates the different error types that can occur
 * within the Network domain logic.
 */
export enum NetworkErrorType {
    /** The network name was left empty. */
    EMPTY_NAME = "Network name cannot be empty.",

    /** The network must have an administrator. */
    MISSING_ADMIN = "Network must have an admin.",

    /** The user is already a member of this network. */
    USER_ALREADY_IN_NETWORK = "User already in network.",

    /** The specified user was not found in this network. */
    USER_NOT_FOUND = "User not found in network.",

    /** The admin user cannot be removed from the network. */
    CANNOT_REMOVE_ADMIN = "Cannot remove the admin."
}

/**
 * Custom error class representing an error in the Network domain.
 *
 * @example
 * ```typescript
 * throw new NetworkError(NetworkErrorType.USER_NOT_FOUND);
 * ```
 */
export class NetworkError extends Error {
    /** Type of network error that occurred. */
    public readonly type: NetworkErrorType;

    /**
     * Creates a new instance of `NetworkError`.
     * @param {NetworkErrorType} type - The specific type of network error.
     */
    constructor(type: NetworkErrorType) {
        super(type);
        this.name = "NetworkError";
        this.type = type;

        // Required when extending built-in classes
        Object.setPrototypeOf(this, NetworkError.prototype);
    }
}

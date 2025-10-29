/**
 * @file RoleErrorType.ts
 * @description Defines role-specific error types and a custom error class
 * used to standardize error handling within the Role domain.
 */

/**
 * Enumerates the different error types that can occur
 * within the Role domain logic.
 */
export enum RoleErrorType {
    /** The role name was left empty. */
    EMPTY_NAME = "Role name cannot be empty.",

    /** The specified permission is already associated with this role. */
    PERMISSION_ALREADY_EXISTS = "Permission already exists in this role.",

    /** The specified permission was not found in this role. */
    PERMISSION_NOT_FOUND = "Permission not found in this role.",

    /** Attempted to assign an invalid permission object. */
    INVALID_PERMISSION = "Invalid permission object provided.",

    /** Attempted to duplicate a role that already exists in the network. */
    DUPLICATE_ROLE = "Role already exists in the network."
}

/**
 * Custom error class representing an error in the Role domain.
 *
 * @example
 * ```typescript
 * throw new RoleError(RoleErrorType.PERMISSION_NOT_FOUND);
 * ```
 */
export class RoleError extends Error {
    /** Type of role error that occurred. */
    public readonly type: RoleErrorType;

    /**
     * Creates a new instance of `RoleError`.
     * @param {RoleErrorType} type - The specific type of role error.
     */
    constructor(type: RoleErrorType) {
        super(type);
        this.name = "RoleError";
        this.type = type;

        // Required for proper subclassing of built-in Error
        Object.setPrototypeOf(this, RoleError.prototype);
    }
}

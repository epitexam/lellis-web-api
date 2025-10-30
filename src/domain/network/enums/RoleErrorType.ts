/**
 * @file RoleErrorType.ts
 * @description
 * Defines role-specific error types and the {@link RoleError} class.
 * Used to standardize and type errors related to role validation and mutation
 * within the domain layer.
 */

/**
 * Enumerates all possible error types related to {@link Role} operations.
 */
export enum RoleErrorType {
    /** The role name cannot be empty. */
    EMPTY_ROLE_NAME = "Role name cannot be empty.",

    /** The role name format is invalid (must be uppercase letters and underscores only). */
    INVALID_ROLE_NAME_FORMAT = "Invalid role name format (must be uppercase letters and underscores).",

    /** The permission already exists in the role and cannot be duplicated. */
    DUPLICATE_PERMISSION = "Permission already exists in this role.",

    /** The permission was not found in the role. */
    PERMISSION_NOT_FOUND = "Permission not found in this role.",

    /** The role already exists in the network and cannot be duplicated. */
    DUPLICATE_ROLE = "Role already exists in the network.",

    /** The role was not found in the network. */
    ROLE_NOT_FOUND = "Role not found in the network.",

    /** The role is currently assigned to one or more users and cannot be removed. */
    ROLE_IN_USE = "Role is currently assigned to members and cannot be removed.",
}

/**
 * Custom domain error for role-related operations.
 *
 * @example
 * ```typescript
 * throw new RoleError(RoleErrorType.DUPLICATE_PERMISSION);
 * ```
 */
export class RoleError extends Error {
    /** The specific type of role error that occurred. */
    public readonly type: RoleErrorType;

    /**
     * Creates a new instance of {@link RoleError}.
     * @param {RoleErrorType} type - The specific error type.
     */
    constructor(type: RoleErrorType) {
        super(type);
        this.name = "RoleError";
        this.type = type;

        // Ensure correct prototype chain for `instanceof` checks.
        Object.setPrototypeOf(this, RoleError.prototype);
    }
}
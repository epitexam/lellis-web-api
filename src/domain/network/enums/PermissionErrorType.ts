/**
 * @file PermissionErrorType.ts
 * @description
 * Defines permission-specific error types and the {@link PermissionError} class.
 * Used to standardize and type errors related to permission validation and mutation
 * within the domain layer.
 */

/**
 * Enumerates all possible error types related to {@link Permission} operations.
 */
export enum PermissionErrorType {
    /** The permission action (e.g., READ, WRITE) cannot be empty. */
    EMPTY_ACTION = "Permission action cannot be empty.",

    /** The resource name cannot be empty. */
    EMPTY_RESOURCE = "Permission resource cannot be empty.",

    /** The action format is invalid (must be uppercase letters and underscores only). */
    INVALID_ACTION_FORMAT = "Invalid permission action format (must be uppercase letters and underscores).",

    /** The resource format is invalid (must be uppercase letters and underscores only). */
    INVALID_RESOURCE_FORMAT = "Invalid permission resource format (must be uppercase letters and underscores).",
}

/**
 * Custom domain error for permission-related operations.
 *
 * @example
 * ```typescript
 * throw new PermissionError(PermissionErrorType.EMPTY_RESOURCE);
 * ```
 */
export class PermissionError extends Error {
    /** The specific type of permission error that occurred. */
    public readonly type: PermissionErrorType;

    /**
     * Creates a new instance of {@link PermissionError}.
     * @param {PermissionErrorType} type - The specific error type.
     */
    constructor(type: PermissionErrorType) {
        super(type);
        this.name = "PermissionError";
        this.type = type;

        // Ensure correct prototype chain for `instanceof` checks.
        Object.setPrototypeOf(this, PermissionError.prototype);
    }
}
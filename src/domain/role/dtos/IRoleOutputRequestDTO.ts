/**
 * @file IRoleOutputRequestDTO.ts
 * @description
 * Generic output DTO for role-related responses.
 *
 * This DTO serves as a base for all role output operations,
 * providing a consistent structure for response data.
 * It includes metadata about the operation result.
 *
 * @example
 * ```ts
 * const output: IRoleOutputRequestDTO = {
 *   success: true,
 *   message: "Role created successfully",
 *   data: {
 *     roleName: "DOCTOR",
 *     permissions: [{ action: "READ", resource: "PATIENT_FILE" }]
 *   }
 * };
 * ```
 */
export interface IRoleOutputRequestDTO {
    /**
     * Indicates whether the operation was successful.
     * @example true
     */
    success: boolean;

    /**
     * A human-readable message describing the result of the operation.
     * @example "Role created successfully"
     */
    message: string;

    /**
     * Optional data payload returned by the operation.
     * Can contain role details, permissions, or other relevant information.
     * @example { roleName: "DOCTOR", permissions: [...] }
     */
    data?: {
        roleName?: string;
        permissions?: Array<{ action: string; resource: string }>;
        roles?: Array<{ name: string; permissions: Array<{ action: string; resource: string }> }>;
    };

    /**
     * Optional error details if the operation failed.
     * Contains error type and additional context.
     * @example { type: "RoleError", code: "DUPLICATE_ROLE" }
     */
    error?: {
        type: string;
        code: string;
        details?: string;
    };
}
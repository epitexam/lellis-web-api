/**
 * @file IPermissionOutputRequestDTO.ts
 * @description
 * Generic output DTO for permission-related responses.
 *
 * This DTO serves as a base for all permission output operations,
 * providing a consistent structure for response data.
 * It includes metadata about the operation result.
 *
 * @example
 * ```ts
 * const output: IPermissionOutputRequestDTO = {
 *   success: true,
 *   message: "Permission added successfully",
 *    {
 *     permission: { action: "READ", resource: "PATIENT_FILE" }
 *   }
 * };
 * ```
 */
export interface IPermissionOutputRequestDTO {
    /**
     * Indicates whether the operation was successful.
     * @example true
     */
    success: boolean;

    /**
     * A human-readable message describing the result of the operation.
     * @example "Permission added successfully"
     */
    message: string;

    /**
     * Optional data payload returned by the operation.
     * Can contain permission details, list of permissions, or other relevant information.
     * @example { permission: { action: "READ", resource: "PATIENT_FILE" } }
     */
    data?: {
        permission?: {
            action: string;
            resource: string;
        };
        permissions?: Array<{
            action: string;
            resource: string;
        }>;
        hasPermission?: boolean;
    };

    /**
     * Optional error details if the operation failed.
     * Contains error type and additional context.
     * @example { type: "PermissionError", code: "DUPLICATE_PERMISSION" }
     */
    error?: {
        type: string;
        code: string;
        details?: string;
    };
}
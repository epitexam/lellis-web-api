/**
 * @file IUpdateRoleDTO.ts
 * @description
 * Data Transfer Object for updating an existing {@link Role} within a network.
 *
 * This DTO is used to transfer role update data from the presentation layer
 * to the application layer, ensuring type safety and validation at the boundary
 * of the domain.
 *
 * @example
 * ```ts
 * const dto: IUpdateRoleDTO = {
 *   networkId: "uuid-of-network",
 *   roleName: "DOCTOR",
 *   newRoleName: "CHIEF_DOCTOR",
 *   permissions: [
 *     { action: "READ", resource: "PATIENT_FILE" },
 *     { action: "DELETE", resource: "REPORT" }
 *   ]
 * };
 * ```
 */
export interface IUpdateRoleDTO {
    /**
     * The unique identifier of the network where the role exists.
     * @example "a1b2c3d4-e5f6-7890-1234-567890abcdef"
     */
    networkId: string;

    /**
     * The current name of the role to update.
     * @example "DOCTOR"
     */
    roleName: string;

    /**
     * Optional: The new name for the role (if renaming).
     * @example "CHIEF_DOCTOR"
     */
    newRoleName?: string;

    /**
     * Optional: An array of permissions to replace the current role permissions.
     * If not provided, the existing permissions will remain unchanged.
     * @example [{ action: "READ", resource: "PATIENT_FILE" }]
     */
    permissions?: Array<{
        action: string;
        resource: string;
    }>;
}
/**
 * @file IUpdatePermissionDTO.ts
 * @description
 * Data Transfer Object for updating an existing {@link Permission} within a role.
 *
 * This DTO is used to transfer permission update data from the presentation layer
 * to the application layer, ensuring type safety and validation at the boundary
 * of the domain.
 *
 * @example
 * ```ts
 * const dto: IUpdatePermissionDTO = {
 *   networkId: "uuid-of-network",
 *   roleName: "DOCTOR",
 *   oldPermission: { action: "READ", resource: "PATIENT_FILE" },
 *   newPermission: { action: "WRITE", resource: "PATIENT_FILE" }
 * };
 * ```
 */
export interface IUpdatePermissionDTO {
    /**
     * The unique identifier of the network where the role exists.
     * @example "a1b2c3d4-e5f6-7890-1234-567890abcdef"
     */
    networkId: string;

    /**
     * The name of the role containing the permission to update.
     * @example "DOCTOR"
     */
    roleName: string;

    /**
     * The current permission to replace.
     * @example { action: "READ", resource: "PATIENT_FILE" }
     */
    oldPermission: {
        action: string;
        resource: string;
    };

    /**
     * The new permission to replace the old one.
     * @example { action: "WRITE", resource: "PATIENT_FILE" }
     */
    newPermission: {
        action: string;
        resource: string;
    };
}
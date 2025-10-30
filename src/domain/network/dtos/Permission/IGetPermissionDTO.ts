/**
 * @file IGetPermissionDTO.ts
 * @description
 * Data Transfer Object for checking if a role has a specific {@link Permission}.
 *
 * This DTO is used to transfer permission check data from the presentation layer
 * to the application layer, ensuring type safety and validation at the boundary
 * of the domain.
 *
 * @example
 * ```ts
 * const dto: IGetPermissionDTO = {
 *   networkId: "uuid-of-network",
 *   roleName: "DOCTOR",
 *   permission: { action: "READ", resource: "PATIENT_FILE" }
 * };
 * ```
 */
export interface IGetPermissionDTO {
    /**
     * The unique identifier of the network where the role exists.
     * @example "a1b2c3d4-e5f6-7890-1234-567890abcdef"
     */
    networkId: string;

    /**
     * The name of the role to check for the permission.
     * @example "DOCTOR"
     */
    roleName: string;

    /**
     * The permission to check for in the role.
     * @example { action: "READ", resource: "PATIENT_FILE" }
     */
    permission: {
        action: string;
        resource: string;
    };
}
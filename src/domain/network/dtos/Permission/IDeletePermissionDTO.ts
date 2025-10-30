/**
 * @file IDeletePermissionDTO.ts
 * @description
 * Data Transfer Object for deleting an existing {@link Permission} from a role.
 *
 * This DTO is used to transfer permission deletion data from the presentation layer
 * to the application layer, ensuring type safety and validation at the boundary
 * of the domain.
 *
 * @example
 * ```ts
 * const dto: IDeletePermissionDTO = {
 *   networkId: "uuid-of-network",
 *   roleName: "DOCTOR",
 *   permission: { action: "READ", resource: "PATIENT_FILE" }
 * };
 * ```
 */
export interface IDeletePermissionDTO {
    /**
     * The unique identifier of the network where the role exists.
     * @example "a1b2c3d4-e5f6-7890-1234-567890abcdef"
     */
    networkId: string;

    /**
     * The name of the role containing the permission to delete.
     * @example "DOCTOR"
     */
    roleName: string;

    /**
     * The permission to remove from the role.
     * @example { action: "READ", resource: "PATIENT_FILE" }
     */
    permission: {
        action: string;
        resource: string;
    };
}
/**
 * @file IGetAllPermissionsForRoleDTO.ts
 * @description
 * Data Transfer Object for retrieving all permissions from a specific role.
 *
 * This DTO is used to transfer permission listing data from the presentation layer
 * to the application layer, ensuring type safety and validation at the boundary
 * of the domain.
 *
 * @example
 * ```ts
 * const dto: IGetAllPermissionsForRoleDTO = {
 *   networkId: "uuid-of-network",
 *   roleName: "DOCTOR"
 * };
 * ```
 */
export interface IGetAllPermissionsForRoleDTO {
    /**
     * The unique identifier of the network where the role exists.
     * @example "a1b2c3d4-e5f6-7890-1234-567890abcdef"
     */
    networkId: string;

    /**
     * The name of the role to retrieve permissions from.
     * @example "DOCTOR"
     */
    roleName: string;
}
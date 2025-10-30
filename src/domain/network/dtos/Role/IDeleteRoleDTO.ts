/**
 * @file IDeleteRoleDTO.ts
 * @description
 * Data Transfer Object for deleting an existing {@link Role} within a network.
 *
 * This DTO is used to transfer role deletion data from the presentation layer
 * to the application layer, ensuring type safety and validation at the boundary
 * of the domain.
 *
 * @example
 * ```ts
 * const dto: IDeleteRoleDTO = {
 *   networkId: "uuid-of-network",
 *   roleName: "NURSE"
 * };
 * ```
 */
export interface IDeleteRoleDTO {
    /**
     * The unique identifier of the network where the role exists.
     * @example "a1b2c3d4-e5f6-7890-1234-567890abcdef"
     */
    networkId: string;

    /**
     * The name of the role to delete.
     * @example "NURSE"
     */
    roleName: string;
}
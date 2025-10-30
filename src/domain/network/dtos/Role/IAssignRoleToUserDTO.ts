/**
 * @file IAssignRoleToUserDTO.ts
 * @description
 * Data Transfer Object for assigning an existing {@link Role} to a user within a network.
 *
 * This DTO is used to transfer role assignment data from the presentation layer
 * to the application layer, ensuring type safety and validation at the boundary
 * of the domain.
 *
 * @example
 * ```ts
 * const dto: IAssignRoleToUserDTO = {
 *   networkId: "uuid-of-network",
 *   userId: "uuid-of-user",
 *   roleName: "DOCTOR"
 * };
 * ```
 */
export interface IAssignRoleToUserDTO {
    /**
     * The unique identifier of the network where the role and user exist.
     * @example "a1b2c3d4-e5f6-7890-1234-567890abcdef"
     */
    networkId: string;

    /**
     * The unique identifier of the user to assign the role to.
     * @example "z9y8x7w6-v5u4-3210-fedc-ba9876543210"
     */
    userId: string;

    /**
     * The name of the role to assign to the user.
     * @example "DOCTOR"
     */
    roleName: string;
}
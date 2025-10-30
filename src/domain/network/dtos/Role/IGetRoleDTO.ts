/**
 * @file IGetRoleDTO.ts
 * @description
 * Data Transfer Object for retrieving a specific {@link Role} from a network.
 *
 * This DTO is used to transfer role retrieval data from the presentation layer
 * to the application layer, ensuring type safety and validation at the boundary
 * of the domain.
 *
 * @example
 * ```ts
 * const dto: IGetRoleDTO = {
 *   networkId: "uuid-of-network",
 *   roleName: "ADMIN"
 * };
 * ```
 */
export interface IGetRoleDTO {
    /**
     * The unique identifier of the network where the role exists.
     * @example "a1b2c3d4-e5f6-7890-1234-567890abcdef"
     */
    networkId: string;

    /**
     * The name of the role to retrieve.
     * @example "ADMIN"
     */
    roleName: string;
}
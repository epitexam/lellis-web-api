/**
 * @file IGetAllRolesDTO.ts
 * @description
 * Data Transfer Object for retrieving all roles from a specific network.
 *
 * This DTO is used to transfer role listing data from the presentation layer
 * to the application layer, ensuring type safety and validation at the boundary
 * of the domain.
 *
 * @example
 * ```ts
 * const dto: IGetAllRolesDTO = {
 *   networkId: "uuid-of-network"
 * };
 * ```
 */
export interface IGetAllRolesDTO {
    /**
     * The unique identifier of the network to retrieve roles from.
     * @example "a1b2c3d4-e5f6-7890-1234-567890abcdef"
     */
    networkId: string;
}
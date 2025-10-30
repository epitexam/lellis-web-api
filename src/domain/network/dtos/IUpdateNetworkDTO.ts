/**
 * @file IUpdateNetworkDTO.ts
 * @description
 * Data Transfer Object for updating an existing {@link Network}.
 *
 * This DTO is used to transfer network update data from the presentation layer
 * to the application layer, ensuring type safety and validation at the boundary
 * of the domain.
 *
 * @example
 * ```ts
 * const dto: IUpdateNetworkDTO = {
 *   networkId: "uuid-of-network",
 *   name: "Hospital B Updated"
 * };
 * ```
 */
export interface IUpdateNetworkDTO {
    /**
     * The unique identifier of the network to update.
     * @example "a1b2c3d4-e5f6-7890-1234-567890abcdef"
     */
    networkId: string;

    /**
     * The new display name of the network (optional).
     * @example "Hospital B Updated"
     */
    name?: string;
}
/**
 * @file ICreateNetworkDTO.ts
 * @description
 * Data Transfer Object for creating a new {@link Network}.
 *
 * This DTO is used to transfer network creation data from the presentation layer
 * to the application layer, ensuring type safety and validation at the boundary
 * of the domain.
 *
 * @example
 * ```ts
 * const dto: ICreateNetworkDTO = {
 *   name: "Hospital A",
 *   adminId: "uuid-of-admin-user"
 * };
 * ```
 */
export interface ICreateNetworkDTO {
    /**
     * The display name of the network (e.g. "Hospital A", "Company B").
     * @example "Hospital A"
     */
    name: string;

    /**
     * The unique identifier of the user who will become the administrator of the network.
     * @example "a1b2c3d4-e5f6-7890-1234-567890abcdef"
     */
    adminId: string;
}
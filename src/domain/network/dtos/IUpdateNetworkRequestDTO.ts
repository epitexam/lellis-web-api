/**
 * @file IUpdateNetworkRequestDTO.ts
 * @description
 * Data Transfer Object (DTO) representing the input structure for updating an existing {@link Network}.
 *
 * This DTO is typically received from the presentation layer (e.g., HTTP request body)
 * and passed into the {@link UpdateNetworkUseCase}. It defines the fields that can be
 * modified within a network entity.
 *
 * Notes:
 * - `networkId` is mandatory to identify which network is being updated.
 * - All other fields are optional to allow partial updates.
 * - Updating the `adminId` field should be restricted to authorized administrators
 *   and verified at the domain or use case level.
 *
 * @example
 * ```typescript
 * // Example: Rename a network
 * const updateDto: IUpdateNetworkRequestDTO = {
 *   networkId: "network-uuid-1234",
 *   name: "New Network Name"
 * };
 *
 * // Example: Transfer network administration
 * const transferDto: IUpdateNetworkRequestDTO = {
 *   networkId: "network-uuid-1234",
 *   adminId: "user-uuid-5678"
 * };
 * ```
 */
export interface IUpdateNetworkRequestDTO {
    /**
     * The unique identifier (UUID) of the network to update.
     * Required.
     *
     * @example "a1b2c3d4-e5f6-7890-1234-567890abcdef"
     */
    networkId: string;

    /**
     * The new display name of the network.
     * Optional — only present when renaming a network.
     *
     * @example "Hospital B Updated"
     */
    name?: string;

    /**
     * The unique identifier (UUID) of the new administrator of the network.
     * Optional — used only when transferring network ownership.
     *
     *  Domain logic should ensure only the current admin (or an authorized system)
     * can change this field.
     *
     * @example "f1e2d3c4-b5a6-0987-6543-210fedcba987"
     */
    adminId?: string;
}

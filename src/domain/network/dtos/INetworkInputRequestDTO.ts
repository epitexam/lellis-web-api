/**
 * @file INetworkInputRequestDTO.ts
 * @description
 * Generic input DTO for network-related requests.
 *
 * This DTO serves as a base for all network input operations,
 * providing a consistent structure for request data.
 *
 * @example
 * ```ts
 * const input: INetworkInputRequestDTO = {
 *   networkId: "uuid-of-network",
 *   userId: "uuid-of-user"
 * };
 * ```
 */
export interface INetworkInputRequestDTO {
    /**
     * The unique identifier of the network involved in the request.
     * @example "a1b2c3d4-e5f6-7890-1234-567890abcdef"
     */
    networkId: string;

    /**
     * The unique identifier of the user making the request.
     * @example "z9y8x7w6-v5u4-3210-fedc-ba9876543210"
     */
    userId: string;
}
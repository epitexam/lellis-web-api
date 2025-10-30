/**
 * @file INetworkOutputRequestDTO.ts
 * @description
 * Generic output DTO for network-related responses.
 *
 * This DTO serves as a base for all network output operations,
 * providing a consistent structure for response data.
 * It includes metadata about the operation result.
 *
 * @example
 * ```ts
 * const output: INetworkOutputRequestDTO = {
 *   success: true,
 *   message: "Network created successfully",
 *   data: { networkId: "uuid-of-new-network" }
 * };
 * ```
 */
export interface INetworkOutputRequestDTO {
    /**
     * Indicates whether the operation was successful.
     * @example true
     */
    success: boolean;

    /**
     * A human-readable message describing the result of the operation.
     * @example "Network created successfully"
     */
    message: string;

    /**
     * Optional data payload returned by the operation.
     * Can contain network details, IDs, or other relevant information.
     * @example { networkId: "a1b2c3d4-e5f6-7890-1234-567890abcdef" }
     */
    data?: any;

    /**
     * Optional error details if the operation failed.
     * Contains error type and additional context.
     * @example { type: "NetworkError", code: "EMPTY_NAME" }
     */
    error?: {
        type: string;
        code: string;
        details?: string;
    };
}
import { INetworkOutputRequestDTO } from "../../../../domain/network/dtos/INetworkOutputRequestDTO";
import { IUpdateNetworkDTO } from "../../../../domain/network/dtos/IUpdateNetworkDTO";
import { NetworkErrorType } from "../../../../domain/network/enums/NetworkErrorType";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";
import { INetworkRepository } from "../../../repositories/INetworkRepository";
import { IUpdateNetworkUseCase } from "./IUpdateNetworkUseCase";

/**
 * @class UpdateNetworkUseCase
 * @implements {IUpdateNetworkUseCase}
 * @description
 * Use case responsible for updating an existing {@link Network} entity.
 *
 * This class ensures that updates are type-safe, validated, and any errors
 * are mapped to {@link NetworkErrorType}. Returns the updated network DTO
 * when successful.
 */
export class UpdateNetworkUseCase implements IUpdateNetworkUseCase {

    /**
     * Creates an instance of UpdateNetworkUseCase.
     * @param {INetworkRepository} networkRepository - Repository for accessing network data.
     */
    constructor(
        private networkRepository: INetworkRepository
    ) { }

    /**
     * Executes the network update operation.
     * 
     * @param {Partial<IUpdateNetworkDTO>} data - Partial DTO with fields to update.
     * Only provided fields will be updated; others remain unchanged.
     * 
     * @returns {Promise<IUseCaseResult<INetworkOutputRequestDTO>>} 
     * A promise resolving to a use case result. Contains the updated network on success.
     * 
     * @example
     * ```ts
     * const result = await updateNetworkUseCase.execute({
     *   networkId: "uuid-123",
     *   name: "Updated Network Name"
     * });
     * if (result.success) {
     *   console.log("Updated network:", result.data);
     * } else {
     *   console.error("Failed to update network:", result.error);
     * }
     * ```
     */
    async execute(data: Partial<IUpdateNetworkDTO>): Promise<IUseCaseResult<INetworkOutputRequestDTO>> {

        if (!data.networkId) {
            return {
                success: false,
                error: NetworkErrorType.MISSING_NETWORK_ID
            };
        }

        try {
            const existingNetwork = await this.networkRepository.findNetworkById(data.networkId);

            if (!existingNetwork) {
                return {
                    success: false,
                    error: NetworkErrorType.NETWORK_NOT_FOUND
                };
            }

            const updatedNetwork = await this.networkRepository.updateNetwork(data.networkId, data);

            return {
                success: true,
                data: updatedNetwork
            };
        } catch (err: any) {

            if (
                err.code === 'P2002' ||       // Prisma
                err.code === '23505' ||       // PostgreSQL
                err.code?.includes('ER_DUP_ENTRY') || // MySQL
                err.code?.includes('SQLITE_CONSTRAINT') // SQLite
            ) {
                return { success: false, error: NetworkErrorType.DATABASE_ERROR };
            }

            // Unexpected errors
            return { success: false, error: NetworkErrorType.UNEXPECTED_ERROR };
        }
    }
}

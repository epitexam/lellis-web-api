import { INetworkOutputRequestDTO } from "../../../../domain/network/dtos/INetworkOutputRequestDTO";
import { IUpdateNetworkRequestDTO } from "../../../../domain/network/dtos/IUpdateNetworkRequestDTO";
import { NetworkError, NetworkErrorType } from "../../../../domain/network/enums/NetworkErrorType";
import { useCaseErrorHandler } from "../../../error/useCaseErrorHandler";
import { HttpStatusCodes } from "../../../interfaces/HttpStatusCodes";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";
import { INetworkRepository } from "../../../repositories/INetworkRepository";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
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
        private networkRepository: INetworkRepository,
        private userRepository: IUsersRepository
    ) { }

    /**
     * Executes the network update operation.
     * 
     * @param {Partial<IUpdateNetworkRequestDTO>} data - Partial DTO with fields to update.
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
    async execute(data: IUpdateNetworkRequestDTO): Promise<IUseCaseResult<INetworkOutputRequestDTO>> {
        try {

            if (!data.networkId) {
                throw new NetworkError(NetworkErrorType.MISSING_NETWORK_ID)
            }

            const existingNetwork = await this.networkRepository.findNetworkById(data.networkId);

            if (!existingNetwork) {
                throw new NetworkError(NetworkErrorType.NETWORK_NOT_FOUND)
            }

            if (existingNetwork.adminId === data.adminId) {
                throw new NetworkError(NetworkErrorType.NOT_ALLOWED_TO_PERFORM_ACTION_IN_NETWORK)
            }

            const updatedNetwork = await this.networkRepository.updateNetwork(data.networkId, data);

            return {
                success: true,
                data: updatedNetwork
            };

        } catch (err: any) {
            return useCaseErrorHandler(err);
        }
    }
}

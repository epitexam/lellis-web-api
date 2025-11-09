import { IGetNetworkDTO } from "../../../../domain/network/dtos/IGetNetworkDTO";
import { INetworkOutputRequestDTO } from "../../../../domain/network/dtos/INetworkOutputRequestDTO";
import { NetworkError, NetworkErrorType } from "../../../../domain/network/enums/NetworkErrorType";
import { useCaseErrorHandler } from "../../../error/useCaseErrorHandler";
import { HttpStatusCodes } from "../../../interfaces/HttpStatusCodes";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";
import { INetworkRepository } from "../../../repositories/INetworkRepository";
import { IGetNetworkUseCase } from "./IGetNetworkUseCase";

/**
 * @file GetNetworkUseCase.ts
 * @description
 * Implements the use case responsible for retrieving a {@link Network} entity
 * by its unique identifier.
 *
 * This class acts as an application-layer service, orchestrating domain logic
 * and repository access while maintaining infrastructure independence.
 *
 * Responsibilities:
 * - Validate input (ensure the presence of a valid network ID).
 * - Interact with the repository to fetch the network.
 * - Return a structured result object following the {@link IUseCaseResult} contract.
 *
 * Errors are gracefully handled and mapped to {@link NetworkErrorType} values.
 *
 * @example
 * ```typescript
 * const useCase = new GetNetworkUseCase(networkRepository);
 * const result = await useCase.execute({ networkId: "uuid-123" });
 *
 * if (result.success) {
 *   console.log("Network retrieved:", result.data);
 * } else {
 *   console.error("Error:", result.error);
 * }
 * ```
 */
export class GetNetworkUseCase implements IGetNetworkUseCase {
    /**
     * Constructs a new {@link GetNetworkUseCase} instance.
     *
     * @param {INetworkRepository} networkRepository
     * The repository responsible for accessing network data.
     */
    constructor(private readonly networkRepository: INetworkRepository) { }

    /**
     * Executes the retrieval process for a single network entity.
     *
     * @async
     * @param {IGetNetworkDTO} data
     * Input containing the target network's unique identifier.
     *
     * @returns {Promise<IUseCaseResult<INetworkOutputRequestDTO>>}
     * Returns a structured result containing:
     * - `data`: The retrieved network information (on success).
     * - `error`: A specific {@link NetworkErrorType} describing the failure (on error).
     *
     */
    async execute(data: IGetNetworkDTO): Promise<IUseCaseResult<INetworkOutputRequestDTO>> {
        try {

            if (!data.networkId || typeof data.networkId !== "string") {
                throw new NetworkError(NetworkErrorType.NETWORK_NOT_FOUND)
            }

            const network = await this.networkRepository.findNetworkById(data.networkId);

            if (!network) {
                throw new NetworkError(NetworkErrorType.NETWORK_NOT_FOUND)
            }

            return {
                success: true,
                data: network,
            };
        } catch (err: any) {
            return useCaseErrorHandler(err);
        }
    }
}

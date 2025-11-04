import { INetworkInputRequestDTO } from "../../../../domain/network/dtos/INetworkInputRequestDTO";
import { INetworkOutputRequestDTO } from "../../../../domain/network/dtos/INetworkOutputRequestDTO";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";

/**
 * @file IGetNetworkUseCase.ts
 * @description
 * Defines the contract for the use case responsible for retrieving a single {@link Network}
 * entity by its unique identifier.
 *
 * This interface ensures a consistent, testable abstraction that isolates
 * application logic from infrastructure concerns (e.g., database, API).
 *
 * Responsibilities:
 * - Accept a network identifier as input.
 * - Retrieve the corresponding network data from a repository.
 * - Return a structured {@link IUseCaseResult} containing either the network data or an error type.
 *
 * @example
 * ```typescript
 * const useCase: IGetNetworkUseCase = new GetNetworkUseCase(networkRepository);
 * const result = await useCase.execute({ networkId: "uuid-1234" });
 *
 * if (result.success) {
 *   console.log("Network found:", result.data);
 * } else {
 *   console.error("Error:", result.error);
 * }
 * ```
 */
export interface IGetNetworkUseCase {
    /**
     * Executes the retrieval of a single network entity.
     *
     * @async
     * @param {Partial<INetworkInputRequestDTO>} data
     * The input data containing the network's unique identifier.
     * Only `networkId` is required; other fields are ignored.
     *
     * @returns {Promise<IUseCaseResult<INetworkOutputRequestDTO>>}
     * A promise resolving to a structured result containing either:
     * - `data`: the found network (on success)
     * - `error`: a {@link NetworkErrorType} (on failure)
     *
     */
    execute(data: Partial<INetworkInputRequestDTO>): Promise<IUseCaseResult<INetworkOutputRequestDTO>>;
}

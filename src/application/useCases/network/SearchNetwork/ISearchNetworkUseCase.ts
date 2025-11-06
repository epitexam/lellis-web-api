import { INetworkOutputRequestDTO } from "../../../../domain/network/dtos/INetworkOutputRequestDTO";
import { ISearchNetworkInputDTO } from "../../../../domain/network/dtos/ISearchNetworkInputDTO";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";

/**
 * @file ISearchNetworkUseCase.ts
 * @description
 * Defines the contract for the use case responsible for searching a {@link Network}
 * entity by its display name.
 *
 * This interface establishes a consistent, testable abstraction that encapsulates
 * application logic and isolates it from infrastructure concerns (such as database or external APIs).
 *
 * Responsibilities:
 * - Accept a network name as input.
 * - Delegate the search operation to a repository.
 * - Return a standardized {@link IUseCaseResult} containing either
 *   the found {@link INetworkOutputRequestDTO} data or an appropriate error type.
 *
 * @example
 * ```typescript
 * const useCase: ISearchNetworkUseCase = new SearchNetworkUseCase(networkRepository);
 * const result = await useCase.execute({ name: "Hospital A" });
 *
 * if (result.success) {
 *   console.log("Network found:", result.data);
 * } else {
 *   console.error("Search error:", result.error);
 * }
 * ```
 */
export interface ISearchNetworkUseCase {
    /**
     * Executes a search operation for a network entity using its display name.
     *
     * @async
     * @param {ISearchNetworkInputDTO} data
     * The input data containing the network's display name.
     *
     * @returns {Promise<IUseCaseResult<INetworkOutputRequestDTO>>}
     * A promise resolving to a structured result that contains:
     * - `data`: the found network (on success)
     * - `error`: a {@link NetworkErrorType} code (on failure)
     */
    execute(data: ISearchNetworkInputDTO): Promise<IUseCaseResult<INetworkOutputRequestDTO>>;
}

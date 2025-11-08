import { IDeleteNetworkDTO } from "../../../../domain/network/dtos/IDeleteNetworkDto";
import { INetworkOutputRequestDTO } from "../../../../domain/network/dtos/INetworkOutputRequestDTO";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";

/**
 * @file IDeleteNetworkUseCase.ts
 * @description
 * Defines the contract for the use case responsible for deleting a {@link Network} entity.
 *
 * This interface establishes a clear, testable abstraction that encapsulates the
 * application logic for deleting networks while isolating domain and infrastructure concerns.
 *
 * Responsibilities:
 * - Accept input data identifying the network to delete.
 * - Ensure that only an authorized administrator can perform the deletion.
 * - Return a standardized {@link IUseCaseResult} indicating success or failure.
 *
 * Expected behavior:
 * - If the specified network does not exist, return `NetworkErrorType.NETWORK_NOT_FOUND`.
 * - If the requesting user is not the network administrator, return
 *   `NetworkErrorType.NOT_ALLOWED_TO_PERFORM_ACTION_IN_NETWORK`.
 * - If deletion succeeds, return the deleted network’s UUID as confirmation.
 *
 * @example
 * ```typescript
 * const useCase: IDeleteNetworkUseCase = new DeleteNetworkUseCase(networkRepository);
 * const result = await useCase.execute({ networkId: "123", adminId: "456" });
 *
 * if (result.success) {
 *   console.log("Network deleted:", result.data);
 * } else {
 *   console.error("Deletion failed:", result.error);
 * }
 * ```
 */
export interface IDeleteNetworkUseCase {
    /**
     * Executes the deletion process for a network entity.
     *
     * @async
     * @param {IDeleteNetworkDTO} data
     * Object containing the identifiers of the network and the requesting admin.
     *
     * @returns {Promise<IUseCaseResult<Partial<INetworkOutputRequestDTO>>>}
     * A structured result containing either:
     * - `data`: Partial network data confirming deletion (e.g., UUID).
     * - `error`: A {@link NetworkErrorType} describing why the deletion failed.
     */
    execute(data: IDeleteNetworkDTO): Promise<IUseCaseResult<Partial<INetworkOutputRequestDTO>>>;
}

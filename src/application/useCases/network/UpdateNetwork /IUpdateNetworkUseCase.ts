import { INetworkOutputRequestDTO } from "../../../../domain/network/dtos/INetworkOutputRequestDTO";
import { IUpdateNetworkDTO } from "../../../../domain/network/dtos/IUpdateNetworkDTO";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";

/**
 * @file IUpdateNetworkUseCase.ts
 * @description
 * Defines the interface for the use case responsible for updating an existing {@link Network}.
 * 
 * This use case encapsulates the application logic required to modify network properties
 * (e.g., name) while enforcing domain rules. It receives a partial update DTO and returns
 * a structured {@link IUseCaseResult} containing the updated network data.
 *
 * @example
 * ```ts
 * const useCase: IUpdateNetworkUseCase = new UpdateNetworkUseCase(networkRepository);
 * const result = await useCase.execute({ networkId: "uuid-123", name: "New Hospital Name" });
 * 
 * if (result.success) {
 *   console.log("Updated network:", result.data);
 * } else {
 *   console.error("Update failed:", result.error);
 * }
 * ```
 */
export interface IUpdateNetworkUseCase {
    /**
     * Executes the network update operation.
     * 
     * @param {Partial<IUpdateNetworkDTO>} data - The partial DTO containing fields to update.
     * Only provided fields will be changed; all others remain unchanged.
     * 
     * @returns {Promise<IUseCaseResult<Partial<INetworkOutputRequestDTO>>>} 
     * A promise resolving to a use case result containing the updated network data or an error message.
     * 
     * @throws Will propagate errors if the network does not exist, or validation rules fail.
     */
    execute(data: Partial<IUpdateNetworkDTO>): Promise<IUseCaseResult<Partial<INetworkOutputRequestDTO>>>;
}

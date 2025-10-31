/**
 * @file ICreateNetworkCase.ts
 * @description
 * Defines the interface for the "Create Network" use case in the application layer.
 *
 * This use case is responsible for handling the business logic involved in
 * creating a new {@link Network} entity — including validation of inputs,
 * ensuring uniqueness, associating an administrator, and returning
 * a structured response according to the domain rules.
 *
 * It does **not** directly persist data; instead, it relies on repository abstractions
 * injected at runtime.
 */

import { ICreateNetworkDTO } from "../../../../domain/network/dtos/ICreateNetworkDTO";
import { INetworkOutputRequestDTO } from "../../../../domain/network/dtos/INetworkOutputRequestDTO";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";

/**
 * @interface ICreateNetworkUseCase
 * @description
 * Application-level interface that defines the contract for creating a new network.
 *
 * It ensures consistent input/output signatures across implementations
 * (e.g., services, controllers, or tests), and enforces separation of concerns
 * between the domain and infrastructure layers.
 *
 * @example
 * ```typescript
 * const useCase: ICreateNetworkCase = new CreateNetworkUseCase(networkRepository, userRepository);
 *
 * const result = await useCase.execute({
 *   name: "Hospital A",
 *   adminId: "user-uuid-123",
 * });
 *
 * if (result.success) {
 *   console.log("Network created:", result.data);
 * } else {
 *   console.error("Error:", result.error);
 * }
 * ```
 */
export interface ICreateNetworkUseCase {
    /**
     * Executes the use case to create a new network.
     *
     * @param {ICreateNetworkDTO} data - The data required to create the network,
     * including name and admin user identifier.
     *
     * @returns {Promise<IUseCaseResult<INetworkOutputRequestDTO>>}
     * A promise resolving to a structured result containing:
     * - `success`: Whether the operation succeeded
     * - `data`: The created network details (if successful)
     * - `error`: An error message or type (if failed)
     */
    execute(data: ICreateNetworkDTO): Promise<IUseCaseResult<INetworkOutputRequestDTO>>;
}

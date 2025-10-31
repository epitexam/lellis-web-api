import { ICreateNetworkDTO } from "../../../../domain/network/dtos/ICreateNetworkDTO";
import { INetworkOutputRequestDTO } from "../../../../domain/network/dtos/INetworkOutputRequestDTO";
import { Network } from "../../../../domain/network/entities/Network";
import { NetworkError, NetworkErrorType } from "../../../../domain/network/enums/NetworkErrorType";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";
import { INetworkRepository } from "../../../repositories/INetworkRepository";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { ICreateNetworkUseCase } from "./ICreateNetworkUseCase";
/**
 * @file CreateNetworkUseCase.ts
 * @description
 * Implements the business logic for creating a new {@link Network}.
 * 
 * This use case ensures that:
 * - The provided admin user exists and is valid.
 * - The network name is unique (if enforced by repository).
 * - A default ADMIN role is created and assigned.
 * 
 * On success, returns a {@link IUseCaseResult<INetworkOutputRequestDTO>} containing
 * the serialized network entity. On failure, returns a result with `success = false`
 * and an appropriate error message.
 * 
 * @example
 * ```ts
 * const result = await createNetworkUseCase.execute({
 *   uuid: crypto.randomUUID(),
 *   name: "Hospital A",
 *   adminId: "user-uuid"
 * });
 * 
 * if (result.success) {
 *   console.log("Network created:", result.data);
 * } else {
 *   console.error("Failed:", result.error);
 * }
 * ```
 */
export class CreateNetworkUseCase implements ICreateNetworkUseCase {
    constructor(
        private readonly networkRepository: INetworkRepository,
        private readonly userRepository: IUsersRepository
    ) { }

    /**
     * Executes the use case for creating a new network.
     * 
     * @param {ICreateNetworkDTO} data - Input data for creating the network.
     * @returns {Promise<IUseCaseResult<INetworkOutputRequestDTO>>}
     * 
     * @throws {NetworkError} If validation fails.
     */
    async execute(data: ICreateNetworkDTO): Promise<IUseCaseResult<INetworkOutputRequestDTO>> {
        try {

            if (!data.name) {
                return {
                    success: false,
                    error: NetworkErrorType.EMPTY_NAME,
                };
            }

            if (!data.adminId) {
                return {
                    success: false,
                    error: NetworkErrorType.MISSING_ADMIN,
                };
            }

            const admin = await this.userRepository.findById(data.adminId);

            if (!admin) {
                return {
                    success: false,
                    error: NetworkErrorType.ADMIN_NOT_FOUND,
                };
            }

            const existingNetwork = await this.networkRepository.findNetworkByName(data.name);

            if (existingNetwork) {
                return {
                    success: false,
                    error: NetworkErrorType.DUPLICATE_NETWORK_NAME,
                };
            }

            const network = new Network(Bun.randomUUIDv7(), data.name, admin.uuid);

            await this.networkRepository.create(network);

            const dto: INetworkOutputRequestDTO = network.toJSON();

            return {
                success: true,
                data: dto,
            };
        } catch (error: any) {
            if (error instanceof NetworkError) {
                return {
                    success: false,
                    error: error.type,
                };
            }

            return {
                success: false,
                error: "UNEXPECTED_ERROR",
            };
        }
    }
}

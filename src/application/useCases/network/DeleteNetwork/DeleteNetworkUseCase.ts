/**
 * @file DeleteNetworkUseCase.ts
 * @description
 * Implements the use case responsible for deleting a {@link Network} entity.
 *
 * This class belongs to the **application layer**, orchestrating domain logic
 * and repository access while maintaining abstraction from persistence or
 * infrastructure concerns.
 *
 * Responsibilities:
 * - Validate that the target network exists.
 * - Verify that the requesting admin is authorized to delete it.
 * - Delegate the deletion process to the repository.
 * - Return a consistent {@link IUseCaseResult} response structure.
 *
 * Error handling:
 * - `NetworkErrorType.NETWORK_NOT_FOUND` → when the target network does not exist.
 * - `NetworkErrorType.NOT_ALLOWED_TO_PERFORM_ACTION_IN_NETWORK` → when the admin ID
 *   does not match the network’s administrator.
 * - `NetworkErrorType.DATABASE_ERROR` → for known database constraint or driver errors.
 * - `NetworkErrorType.UNEXPECTED_ERROR` → for unclassified or unexpected exceptions.
 *
 * @example
 * ```typescript
 * const useCase = new DeleteNetworkUseCase(networkRepository);
 * const result = await useCase.execute({ networkId: "net-123", adminId: "user-456" });
 *
 * if (result.success) {
 *   console.log("Network deleted:", result.data.uuid);
 * } else {
 *   console.error("Error:", result.error);
 * }
 * ```
 */
import { IDeleteNetworkDTO } from "../../../../domain/network/dtos/IDeleteNetworkDto";
import { INetworkOutputRequestDTO } from "../../../../domain/network/dtos/INetworkOutputRequestDTO";
import { NetworkErrorType } from "../../../../domain/network/enums/NetworkErrorType";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";
import { INetworkRepository } from "../../../repositories/INetworkRepository";
import { IDeleteNetworkUseCase } from "./IDeleteNetworkUseCase";

export class DeleteNetworkUseCase implements IDeleteNetworkUseCase {

    /**
     * Constructs a new {@link DeleteNetworkUseCase} instance.
     *
     * @param {INetworkRepository} networkRepository
     * Repository providing access to network persistence operations.
     */
    constructor(private readonly networkRepository: INetworkRepository) { }

    /**
     * Executes the process of deleting a network entity.
     *
     * @async
     * @param {IDeleteNetworkDTO} data
     * Object containing the `networkId` to delete and the `adminId` of the requester.
     *
     * @returns {Promise<IUseCaseResult<Partial<INetworkOutputRequestDTO>>>}
     * Structured result indicating the success or failure of the operation.
     */
    async execute(data: IDeleteNetworkDTO): Promise<IUseCaseResult<Partial<INetworkOutputRequestDTO>>> {
        try {
            const networkInfo = await this.networkRepository.findNetworkById(data.networkId);

            if (!networkInfo) {
                return {
                    success: false,
                    error: NetworkErrorType.NETWORK_NOT_FOUND
                };
            }

            if (networkInfo.adminId !== data.adminId) {
                return {
                    success: false,
                    error: NetworkErrorType.NOT_ALLOWED_TO_PERFORM_ACTION_IN_NETWORK
                };
            }

            await this.networkRepository.deleteNetwork(data.networkId);

            return {
                success: true,
                data: { uuid: networkInfo.uuid }
            };

        } catch (err: any) {
            if (
                err.code === 'P2002' ||       // Prisma constraint error
                err.code === '23505' ||       // PostgreSQL unique violation
                err.code?.includes('ER_DUP_ENTRY') || // MySQL
                err.code?.includes('SQLITE_CONSTRAINT') // SQLite
            ) {
                return { success: false, error: NetworkErrorType.DATABASE_ERROR };
            }

            // Fallback for unexpected or unclassified errors
            return { success: false, error: NetworkErrorType.UNEXPECTED_ERROR };
        }
    }
}

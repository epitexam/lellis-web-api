import { INetworkOutputRequestDTO } from "../../../../domain/network/dtos/INetworkOutputRequestDTO";
import { ISearchNetworkInputDTO } from "../../../../domain/network/dtos/ISearchNetworkInputDTO";
import { NetworkError, NetworkErrorType } from "../../../../domain/network/enums/NetworkErrorType";
import { HttpStatusCodes } from "../../../interfaces/HttpStatusCodes";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";
import { INetworkRepository } from "../../../repositories/INetworkRepository";
import { ISearchNetworkUseCase } from "./ISearchNetworkUseCase";

/**
 * @file SearchNetworkUseCase.ts
 * @description
 * Implements the use case responsible for retrieving a {@link Network}
 * entity by its display name.
 *
 * This class is part of the application layer, coordinating the domain logic
 * and repository access while ensuring that infrastructure details remain abstracted.
 *
 * Responsibilities:
 * - Validate input (ensure the `name` field is present and non-empty).
 * - Query the repository for the corresponding network.
 * - Return a consistent result following the {@link IUseCaseResult} contract.
 *
 * Error handling:
 * - Input validation errors return `NetworkErrorType.EMPTY_NAME`.
 * - Missing network results return `NetworkErrorType.NETWORK_NOT_FOUND`.
 * - Database or unexpected errors are mapped to corresponding {@link NetworkErrorType} values.
 *
 * @example
 * ```typescript
 * const useCase = new SearchNetworkUseCase(networkRepository);
 * const result = await useCase.execute({ name: "Hospital A" });
 *
 * if (result.success) {
 *   console.log("Network retrieved:", result.data);
 * } else {
 *   console.error("Error:", result.error);
 * }
 * ```
 */
export class SearchNetworkUseCase implements ISearchNetworkUseCase {

    /**
     * Constructs a new {@link SearchNetworkUseCase} instance.
     *
     * @param {INetworkRepository} networkRepository
     * Repository providing access to network persistence operations.
     */
    constructor(
        private readonly networkRepository: INetworkRepository
    ) { }

    /**
     * Executes the process of finding a network by its display name.
     *
     * @async
     * @param {ISearchNetworkInputDTO} data
     * Object containing the target network's display name.
     *
     * @returns {Promise<IUseCaseResult<INetworkOutputRequestDTO[]>>}
     * A structured result containing either:
     * - `data`: The retrieved network information (on success).
     * - `error`: A {@link NetworkErrorType} describing the failure (on error).
     */
    async execute(data: ISearchNetworkInputDTO): Promise<IUseCaseResult<INetworkOutputRequestDTO[]>> {
        try {
            if (!data.name) {
                throw new NetworkError(NetworkErrorType.EMPTY_NAME)
            }
            const networkInfo = await this.networkRepository.findNetworkByName(data.name);

            if (!networkInfo) {
                throw new NetworkError(NetworkErrorType.NETWORK_NOT_FOUND)
            }

            return {
                success: true,
                data: networkInfo,
            };
            
        } catch (err: any) {
            if (
                err.code === "P2002" ||       // Prisma unique constraint
                err.code === "23505" ||       // PostgreSQL unique constraint
                err.code?.includes("ER_DUP_ENTRY") || // MySQL
                err.code?.includes("SQLITE_CONSTRAINT") // SQLite
            ) {
                return {
                    success: false,
                    error: {
                        type: NetworkErrorType.DATABASE_ERROR,
                        message: NetworkErrorType.DATABASE_ERROR,
                        statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
                    }
                };
            }

            return {
                success: false,
                error: {
                    type: NetworkErrorType.UNEXPECTED_ERROR,
                    message: NetworkErrorType.UNEXPECTED_ERROR,
                    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR
                }
            };
        }
    }
}

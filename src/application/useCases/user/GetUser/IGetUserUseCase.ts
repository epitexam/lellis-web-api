import { IUserInputRequestDTO } from "../../../../domain/user/dtos/IUserInputRequestDTO";
import { IUserOutputRequestDTO } from "../../../../domain/user/dtos/IUserOutputRequestDTO";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";

/**
 * @file IGetUserUseCase.ts
 * @description
 * Interface defining the contract for the "Get User" use case.
 * 
 * This use case is responsible for retrieving a single user
 * based on a unique identifier (UUID) or other minimal input criteria.
 * It abstracts the application logic from the infrastructure and repository layers.
 *
 * @example
 * ```ts
 * const result = await getUserUseCase.execute({ uuid: "user-uuid-123" });
 * if (result.success) {
 *   console.log(result.data.first_name);
 * }
 * ```
 */
export interface IGetUserUseCase {
    /**
     * Executes the use case to fetch a single user by UUID or partial identifiers.
     *
     * @param {Partial<IUserInputRequestDTO>} data - Partial DTO containing user query criteria.
     * @returns {Promise<IUseCaseResult<IUserOutputRequestDTO>>} The result of the operation,
     * including success status, user data if found, or error message if failed.
     */
    execute(data: Partial<IUserInputRequestDTO>): Promise<IUseCaseResult<IUserOutputRequestDTO>>;
}

// ISearchUsersUseCase.ts
/**
 * @file ISearchUsersUseCase.ts
 * @description
 * Interface defining the contract for searching users based on their information
 * such as first name, last name, or other optional filters.
 *
 * This use case abstracts the application logic for querying multiple users
 * without exposing repository details or domain entities directly.
 *
 * @example
 * ```ts
 * const result = await searchUsersUseCase.execute({ first_name: "Alice" });
 * if (result.success) {
 *   console.log(result.data.length); // Number of users found
 * }
 * ```
 */
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";
import { IUserOutputRequestDTO } from "../../../../domain/user/dtos/IUserOutputRequestDTO";
import { ISearchUsersInputDTO } from "../../../../domain/user/dtos/ISearchUsersInputDTO";

export interface ISearchUsersUseCase {
    /**
     * Executes the search for users based on partial input criteria.
     *
     * @param {Partial<ISearchUsersInputDTO>} criteria - Object containing optional search filters.
     * @returns {Promise<IUseCaseResult<IUserOutputRequestDTO[]>>} Result of the search operation,
     * including success status, array of matching users, or an error message.
     */
    execute(criteria: Partial<ISearchUsersInputDTO>): Promise<IUseCaseResult<IUserOutputRequestDTO[]>>;
}
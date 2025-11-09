/**
 * @file DeleteUserUseCase.ts
 * @description
 * Implements the application-layer use case for deleting a user.
 * 
 * This class follows Clean Architecture principles:
 * - It orchestrates domain logic for user deletion.
 * - It communicates only with abstractions (repository interface).
 * - It returns a standardized {@link IUseCaseResult} for API or controller layers.
 */

import { IUserOutputRequestDTO } from "../../../../domain/user/dtos/IUserOutputRequestDTO";
import { UserError, UserErrorType } from "../../../../domain/user/enums/UserErrorType";
import { useCaseErrorHandler } from "../../../error/useCaseErrorHandler";
import { HttpStatusCodes } from "../../../interfaces/HttpStatusCodes";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { IDeleteUserUseCase } from "./IDeleteUserUseCase";

/**
 * @class DeleteUserUseCase
 * @implements {IDeleteUserUseCase}
 * @description
 * Application service responsible for removing a user from the system.
 * 
 * The use case ensures:
 * - The user exists before deletion.
 * - Repository operations are correctly abstracted.
 * - Errors are handled and returned in a consistent format.
 * 
 * @example
 * ```typescript
 * const useCase = new DeleteUserUseCase(userRepository);
 * const result = await useCase.execute("123e4567-e89b-12d3-a456-426614174000");
 * 
 * if (result.success) {
 *   console.log("User deleted successfully");
 * } else {
 *   console.error("Error deleting user:", result.error);
 * }
 * ```
 */
export class DeleteUserUseCase implements IDeleteUserUseCase {

    constructor(
        private readonly userRepository: IUsersRepository
    ) { }

    /**
     * Executes the user deletion process.
     * 
     * @async
     * @param {string} uuid - The unique identifier of the user to delete.
     * 
     * @returns {Promise<IUseCaseResult<Partial<IUserOutputRequestDTO>>>}
     * Returns a standardized result object containing either:
     * - `success: true` if deletion succeeded.
     * - `success: false` with an appropriate `error` code otherwise.
     * 
     * @throws {UserError} If unexpected domain-level errors occur.
     */
    async execute(uuid: string): Promise<IUseCaseResult<Partial<IUserOutputRequestDTO>>> {
        try {
            const existingUser = await this.userRepository.findById(uuid);

            if (!existingUser) {
                throw new UserError(UserErrorType.USER_NOT_FOUND)
            }

            await this.userRepository.delete(uuid);

            return {
                success: true,
            };

        } catch (err: any) {
            return useCaseErrorHandler(err);
        }
    }
}

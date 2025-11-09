import { IUpdateUserRequestDTO } from "../../../../domain/user/dtos/IUpdateUserRequestDTO";
import { IUserOutputRequestDTO } from "../../../../domain/user/dtos/IUserOutputRequestDTO";
import { UserError, UserErrorType } from "../../../../domain/user/enums/UserErrorType";
import { useCaseErrorHandler } from "../../../error/useCaseErrorHandler";
import { HttpStatusCodes } from "../../../interfaces/HttpStatusCodes";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";
import { IPasswordHasher } from "../../../providers/IPasswordHasher";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { IUpdateUserUseCase } from "./IUpdateUserUseCase";

/**
 * @file UpdateUserUseCase.ts
 * @description
 * Implements the use case responsible for updating an existing {@link User} entity.
 *
 * This class orchestrates the process of:
 * - Retrieving the existing user (including sensitive fields),
 * - Hashing a new password if provided,
 * - Applying updates to the user,
 * - Returning a sanitized output DTO.
 *
 * Sensitive data (like password hashes) are never exposed outside the application layer.
 *
 * @example
 * ```typescript
 * const useCase = new UpdateUserUseCase(userRepository, passwordHasher);
 * const result = await useCase.execute("uuid-user-123", { first_name: "Alice" });
 *
 * if (result.success) {
 *   console.log("User updated:", result.data);
 * } else {
 *   console.error("Update failed:", result.error);
 * }
 * ```
 */
export class UpdateUserUseCase implements IUpdateUserUseCase {
    /**
     * Constructs a new {@link UpdateUserUseCase} instance.
     *
     * @param {IUsersRepository} userRepository - Repository responsible for user data persistence.
     * @param {IPasswordHasher} passwordHasher - Service for securely hashing passwords.
     */
    constructor(
        private readonly userRepository: IUsersRepository,
        private readonly passwordHasher: IPasswordHasher
    ) { }

    /**
     * Executes the user update operation.
     *
     * @async
     * @param {string} userId - The unique identifier (UUID) of the user to update.
     * @param {Partial<IUpdateUserRequestDTO>} data - The fields to update.
     *
     * @returns {Promise<IUseCaseResult<IUserOutputRequestDTO>>}
     * A structured result object containing:
     * - `data`: the updated user information (on success)
     * - `error`: a {@link UserErrorType} describing the failure (on error)
     */
    async execute(userId: string, data: Partial<IUpdateUserRequestDTO>): Promise<IUseCaseResult<IUserOutputRequestDTO>> {
        try {
            const existingUser = await this.userRepository.findUserWithSensitiveData(userId);
            if (!existingUser) {
                throw new UserError(UserErrorType.USER_NOT_FOUND);
            }

            const updateData: Partial<IUpdateUserRequestDTO> = { ...data };

            if (data.password) {
                updateData.password = await this.passwordHasher.hashPassword(data.password);
            }

            const updatedUser = await this.userRepository.update(existingUser, updateData);

            return { success: true, data: updatedUser };
        } catch (err: any) {
            return useCaseErrorHandler(err);
        }
    }
}

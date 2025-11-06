import { IUpdateUserRequestDTO } from "../../../../domain/user/dtos/IUpdateUserRequestDTO";
import { IUserOutputRequestDTO } from "../../../../domain/user/dtos/IUserOutputRequestDTO";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";

/**
 * @file IUpdateUserUseCase.ts
 * @description
 * Defines the contract for the use case responsible for updating an existing {@link User} entity.
 *
 * This interface provides a consistent abstraction for application logic,
 * decoupling business rules from infrastructure details (like database or API layers).
 *
 * Responsibilities:
 * - Accept a unique user identifier (`userId`) and partial update data.
 * - Validate and delegate the update process to a repository or domain service.
 * - Return a standardized {@link IUseCaseResult} containing either the updated user data or an error.
 *
 * @example
 * ```typescript
 * const useCase: IUpdateUserUseCase = new UpdateUserUseCase(userRepository);
 * const result = await useCase.execute("uuid-user-123", { first_name: "Alice" });
 *
 * if (result.success) {
 *   console.log("User updated:", result.data);
 * } else {
 *   console.error("Update failed:", result.error);
 * }
 * ```
 */
export interface IUpdateUserUseCase {
    /**
     * Executes the process of updating a user's information.
     *
     * @async
     * @param {string} userId
     * The unique identifier (UUID) of the user to update.
     *
     * @param {Partial<IUpdateUserRequestDTO>} data
     * The new data to apply to the user.
     * Only the provided fields will be updated.
     *
     * @returns {Promise<IUseCaseResult<IUserOutputRequestDTO>>}
     * A promise resolving to a structured result containing either:
     * - `data`: the updated user entity (on success)
     * - `error`: a description or enum value indicating the type of failure (on error)
     */
    execute(userId: string, data: Partial<IUpdateUserRequestDTO>): Promise<IUseCaseResult<IUserOutputRequestDTO>>;
}
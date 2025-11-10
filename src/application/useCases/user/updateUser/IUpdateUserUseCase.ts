import { IUpdateUserInputDTO } from "../../../../domain/user/dtos/update/IUpdateUserInputDTO";
import { IUpdateUserOutputDTO } from "../../../../domain/user/dtos/update/IUpdateUserOutputDTO";
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
 * - Accept a unique user identifier (`userInfo.uuid`) and partial update data.
 * - Validate and delegate the update process to a repository or domain service.
 * - Return a standardized {@link IUseCaseResult} containing either the updated user's UUID or an error.
 *
 * @example
 * ```typescript
 * const useCase: IUpdateUserUseCase = new UpdateUserUseCase(userRepository, passwordHasher);
 * const result = await useCase.execute({ uuid: "uuid-user-123" }, { first_name: "Alice" });
 *
 * if (result.success) {
 *   console.log("User updated, UUID:", result.data.user_id);
 * } else {
 *   console.error("Update failed:", result.error);
 * }
 * ```
 */
export interface IUpdateUserUseCase {
    /**
     * Executes the process of updating a user's information.
     *
     *
     * @param {IUpdateUserInputDTO} data
     * The new data to apply to the user.
     * Only the provided fields will be updated.
     *
     * @returns {Promise<IUseCaseResult<IUpdateUserOutputDTO>>}
     * A promise resolving to a structured result containing either:
     * - `data`: an object with the updated user's UUID (on success)
     * - `error`: a description or enum value indicating the type of failure (on error)
     */
    execute(data: IUpdateUserInputDTO): Promise<IUseCaseResult<IUpdateUserOutputDTO>>;
}
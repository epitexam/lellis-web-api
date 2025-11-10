import { IUserOutputRequestDTO } from "../../../../domain/user/dtos/IUserOutputRequestDTO";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";

/**
 * @file IDeleteUserUseCase.ts
 * @description
 * Defines the application-layer interface for the "Delete User" use case.
 *
 * This use case handles the business logic required to remove a user
 * from the system while enforcing domain invariants and validation rules.
 *
 * It delegates persistence logic to the user repository abstraction
 * and returns a standardized result via {@link IUseCaseResult}.
 */

/**
 * @interface IDeleteUserUseCase
 * @description
 * Contract for deleting an existing user from the system.
 *
 * This use case is responsible for orchestrating all domain rules related to
 * user deletion, such as verifying the user's existence, checking constraints,
 * and ensuring consistent removal across related aggregates (if any).
 *
 * The interface defines the expected input (a user UUID)
 * and output (a wrapped result object indicating success or failure).
 *
 * @example
 * ```typescript
 * const useCase: IDeleteUserUseCase = new DeleteUserUseCase(userRepository);
 *
 * const result = await useCase.execute("user-uuid-123");
 *
 * if (result.success) {
 *   console.log("User deleted successfully:", result.data);
 * } else {
 *   console.error("Failed to delete user:", result.error);
 * }
 * ```
 */
export interface IDeleteUserUseCase {
    /**
     * Executes the deletion of a user by their unique identifier.
     *
     * @param {string} uuid - The unique identifier (UUID) of the user to delete.
     *
     * @returns {Promise<IUseCaseResult<Partial<IUserOutputRequestDTO>>>}
     * A promise resolving to an object that indicates:
     * - `success`: Whether the operation completed successfully.
     * - `data`: Partial user data for confirmation or auditing (optional).
     * - `error`: Error details or message if the operation failed.
     *
     * @throws {UserError} May throw domain-level errors if constraints are violated.
     */
    execute(uuid: string): Promise<IUseCaseResult<Partial<IUserOutputRequestDTO>>>;
}

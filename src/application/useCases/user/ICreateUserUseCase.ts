import { ICreateUserDTO } from "../../../domain/user/dtos/ICreateUserDTO";
import { IUserOutputRequestDTO } from "../../../domain/user/dtos/IUserOutputRequestDTO";

/**
 * Represents the generic structure of a use case result.
 * 
 * @template T - The type of the expected data when the operation succeeds.
 */
export interface IUseCaseResult<T> {
    /**
     * Indicates whether the operation succeeded.
     */
    success: boolean;

    /**
     * The resulting data when the operation is successful.
     */
    data?: T;

    /**
     * An error message, present only when the operation fails.
     */
    error?: string;
}

/**
 * Interface for the CreateUserUseCase.
 * 
 * Defines the contract for a use case responsible for creating a new user.
 * Any implementation of this interface must provide the `execute` method.
 */
export interface ICreateUserUseCase {
    /**
     * Executes the user creation process.
     * 
     * @param data - The user data required for creation (email, first_name, last_name, password).
     * 
     * @returns A promise resolving to an {@link IUseCaseResult} containing:
     *  - `success`: A boolean indicating if the operation was successful.
     *  - `data`: The created user object when successful.
     *  - `error`: A message describing the failure reason, when applicable.
     */
    execute(data: ICreateUserDTO): Promise<IUseCaseResult<IUserOutputRequestDTO>>;
}

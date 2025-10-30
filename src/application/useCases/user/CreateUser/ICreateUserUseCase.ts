import { ICreateUserDTO } from "../../../../domain/user/dtos/ICreateUserDTO";
import { IUserOutputRequestDTO } from "../../../../domain/user/dtos/IUserOutputRequestDTO";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";

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

import { IUpdateUserRequestDTO } from "../../../../domain/user/dtos/IUpdateUserRequestDTO";
import { IUserOutputRequestDTO } from "../../../../domain/user/dtos/IUserOutputRequestDTO";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";

/**
 * Interface for the UpdateUserCase.
 * 
 * Defines the contract for a use case responsible for updating a user.
 * Any implementation of this interface must provide the `execute` method.
 */
export interface IUpdateUserUseCase {
    /**
     * Executes the user updating process.
     * 
     * @param data - The user data required for updating user informations (email, first_name, last_name, password).
     * 
     * @returns A promise resolving to an {@link IUseCaseResult} containing:
     *  - `success`: A boolean indicating if the operation was successful.
     *  - `data`: The created user object when successful.
     *  - `error`: A message describing the failure reason, when applicable.
     */
    execute(userEmail:string, data: Partial<IUpdateUserRequestDTO>): Promise<IUseCaseResult<IUserOutputRequestDTO>>;
}
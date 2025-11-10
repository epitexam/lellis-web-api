import { ICreateUserUseCase } from "../../../../application/useCases/user/CreateUser/ICreateUserUseCase";
import { ICreateUserDTO } from "../../../../domain/user/dtos/create/ICreateUserDTO";
import { IUserOutputRequestDTO } from "../../../../domain/user/dtos/IUserOutputRequestDTO";
import { IController } from "../../interface/IController";

/**
 * Controller responsible for handling user creation requests.
 * 
 * It acts as a mediator between the HTTP adapter (e.g., Elysia) and
 * the application layer's CreateUserUseCase.
 */
export class CreateUserController implements IController<ICreateUserDTO, IUserOutputRequestDTO> {
  constructor(private readonly createUserCase: ICreateUserUseCase) { }

  async handle(request: ICreateUserDTO): Promise<IUserOutputRequestDTO> {
    const result = await this.createUserCase.execute({
      ...request
    });

    if (!result.success || !result.data) {
      throw result.error;
    }

    return result.data
  }
}

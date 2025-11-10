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
      last_name: request.last_name,
      first_name: request.first_name,
      email: request.email,
      password: request.password,
    });

    if (!result.success || !result.data) {
      throw result.error;
    }

    return {
      uuid: result.data.uuid,
      first_name: result.data.first_name,
      last_name: result.data.last_name,
      created_at: result.data.created_at,
      updated_at: result.data.updated_at,
    };
  }
}

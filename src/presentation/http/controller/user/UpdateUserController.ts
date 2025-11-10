import { IUpdateUserUseCase } from "../../../../application/useCases/user/updateUser/IUpdateUserUseCase";
import { IUpdateUserInputDTO } from "../../../../domain/user/dtos/update/IUpdateUserInputDTO";
import { IController } from "../../interface/IController";
import { IUpdateUserOutputDTO } from "../../../../domain/user/dtos/update/IUpdateUserOutputDTO";
import { getResponseSchemaValidator } from "elysia";

export class UpdateUserController implements IController<IUpdateUserInputDTO, IUpdateUserOutputDTO> {
    constructor(private readonly updateUserUseCase: IUpdateUserUseCase) { }

    async handle(request: IUpdateUserInputDTO): Promise<IUpdateUserOutputDTO> {
        const result = await this.updateUserUseCase.execute(request)

        if (!result.success || !result.data) {
            throw result.error;
        }

        return result.data
    }
}
import { IUpdateUserUseCase } from "../../../../application/useCases/user/updateUser/IUpdateUserUseCase";
import { IUpdateUserInputDTO } from "../../../../domain/user/dtos/update/IUpdateUserInputDTO";
import { IUserOutputRequestDTO } from "../../../../domain/user/dtos/IUserOutputRequestDTO";
import { IController } from "../../interface/IController";

export class UpdateUserController implements IController<IUpdateUserInputDTO, Partial<IUserOutputRequestDTO>> {
    constructor(private readonly updateUserUseCase: IUpdateUserUseCase) { }

    async handle(request: IUpdateUserInputDTO): Promise<Partial<IUserOutputRequestDTO>> {
        const { user_id, ...updateData } = request;

        const result = await this.updateUserUseCase.execute(user_id, updateData)

        if (!result.success || !result.data) {
            throw result.error;
        }

        return {
            uuid: result.data.uuid,
        };
    }
}
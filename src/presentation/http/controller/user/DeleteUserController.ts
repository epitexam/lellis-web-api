import { IDeleteUserUseCase } from "../../../../application/useCases/user/DeleteUser/IDeleteUserUseCase";
import { IGetUserDto } from "../../../../domain/user/dtos/IGetUserDTO";
import { IUserOutputRequestDTO } from "../../../../domain/user/dtos/IUserOutputRequestDTO";
import { IController } from "../../interface/IController";

export class DeleteUserController implements IController<IGetUserDto, Partial<IUserOutputRequestDTO>> {

    constructor(private readonly deleteUserUseCase: IDeleteUserUseCase) { }

    async handle(request: IGetUserDto): Promise<Partial<IUserOutputRequestDTO>> {
        const result = await this.deleteUserUseCase.execute(request.uuid)

        if (!result.success || !result.data) {
            throw new Error(result.error ?? "Failed to fetch user info.");
        }

        return {
            uuid: result.data.uuid
        }
    }
}
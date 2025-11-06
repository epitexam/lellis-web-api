import { IGetUserUseCase } from "../../../application/useCases/user/GetUser/IGetUserUseCase";
import { IGetUserDto } from "../../../domain/user/dtos/IGetUserDTO";
import { IUserOutputRequestDTO } from "../../../domain/user/dtos/IUserOutputRequestDTO";
import { IController } from "../interface/IController";

export class GetUserController implements IController<IGetUserDto, IUserOutputRequestDTO> {
    constructor(private readonly getUserUseCase: IGetUserUseCase) { }

    async handle(request: IGetUserDto): Promise<IUserOutputRequestDTO> {

        const result = await this.getUserUseCase.execute({ uuid: request.uuid })

        if (!result.success || !result.data) {
            throw new Error(result.error ?? "Failed to fetch user info.");
        }

        return result.data
    }
}
import { IDeleteUserUseCase } from "../../../../application/useCases/user/DeleteUser/IDeleteUserUseCase";
import { INetworkInputRequestDTO } from "../../../../domain/network/dtos/INetworkInputRequestDTO";
import { INetworkOutputRequestDTO } from "../../../../domain/network/dtos/INetworkOutputRequestDTO";
import { IController } from "../../interface/IController";

export class DeleteNetworkController implements IController<INetworkInputRequestDTO, Partial<INetworkOutputRequestDTO>> {

    constructor(private readonly deleteNetworkUseCase:IDeleteUserUseCase) { }

    async handle(request: INetworkInputRequestDTO): Promise<Partial<INetworkOutputRequestDTO>> {
        const result = await this.deleteNetworkUseCase.execute(request.networkId)

        if (!result.success || !result.data) {
            throw new Error(result.error ?? "Failed to delete network.");
        }

        return {
            uuid: result.data.uuid,
        }
    }
}
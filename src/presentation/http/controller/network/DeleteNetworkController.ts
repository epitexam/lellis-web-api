import { IDeleteNetworkUseCase } from "../../../../application/useCases/network/DeleteNetwork/IDeleteNetworkUseCase";
import { IDeleteNetworkDTO } from "../../../../domain/network/dtos/IDeleteNetworkDto";
import { INetworkOutputRequestDTO } from "../../../../domain/network/dtos/INetworkOutputRequestDTO";
import { IController } from "../../interface/IController";

export class DeleteNetworkController implements IController<IDeleteNetworkDTO, Partial<INetworkOutputRequestDTO>> {

    constructor(private readonly deleteNetworkUseCase: IDeleteNetworkUseCase) { }

    async handle(request: IDeleteNetworkDTO): Promise<Partial<INetworkOutputRequestDTO>> {
        const result = await this.deleteNetworkUseCase.execute(request)

        if (!result.success || !result.data) {
            throw new Error(result.error ?? "Failed to delete network.");
        }

        return {
            uuid: result.data.uuid,
        }
    }
}
import { IUpdateNetworkUseCase } from "../../../../application/useCases/network/UpdateNetwork /IUpdateNetworkUseCase";
import { INetworkOutputRequestDTO } from "../../../../domain/network/dtos/INetworkOutputRequestDTO";
import { IUpdateNetworkRequestDTO } from "../../../../domain/network/dtos/IUpdateNetworkRequestDTO";
import { IController } from "../../interface/IController";

export class UpdateNetworkController implements IController<IUpdateNetworkRequestDTO, Partial<INetworkOutputRequestDTO>> {
    constructor(private readonly updateNetworkUseCase: IUpdateNetworkUseCase) { }

    async handle(request: IUpdateNetworkRequestDTO): Promise<Partial<INetworkOutputRequestDTO>> {
        const result = await this.updateNetworkUseCase.execute(request)

        if (!result.success || !result.data) {
            throw new Error(result.error ?? "Failed to create new network.");
        }

        return {
            uuid: result.data.uuid,
        }
    }
}
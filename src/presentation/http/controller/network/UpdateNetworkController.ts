import { UpdateNetworkUseCase } from "../../../../application/useCases/network/UpdateNetwork /UpdateNetworkUseCase";
import { INetworkOutputRequestDTO } from "../../../../domain/network/dtos/INetworkOutputRequestDTO";
import { IUpdateNetworkDTO } from "../../../../domain/network/dtos/IUpdateNetworkDTO";
import { IController } from "../../interface/IController";

export class UpdateNetworkController implements IController<IUpdateNetworkDTO, Partial<INetworkOutputRequestDTO>> {
    constructor(private readonly updateNetworkUseCase: UpdateNetworkUseCase) { }

    async handle(request: IUpdateNetworkDTO): Promise<Partial<INetworkOutputRequestDTO>> {
        const result = await this.updateNetworkUseCase.execute(request)

        if (!result.success || !result.data) {
            throw new Error(result.error ?? "Failed to create new network.");
        }

        return {
            uuid: result.data.uuid,
        }
    }
}
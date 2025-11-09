import { IGetNetworkUseCase } from "../../../../application/useCases/network/GetNetwork/IGetNetworkUseCase";
import { IGetNetworkDTO } from "../../../../domain/network/dtos/IGetNetworkDTO";
import { INetworkOutputRequestDTO } from "../../../../domain/network/dtos/INetworkOutputRequestDTO";
import { IController } from "../../interface/IController";

export class GetNetworkController implements IController<IGetNetworkDTO, INetworkOutputRequestDTO> {

    constructor(private readonly getNetworkUseCase: IGetNetworkUseCase) { }

    async handle(request: IGetNetworkDTO): Promise<INetworkOutputRequestDTO> {
        const result = await this.getNetworkUseCase.execute(request)

        if (!result.success || !result.data) {
            throw result.error;
        }

        return result.data
    }
}
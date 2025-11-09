import { ICreateNetworkUseCase } from "../../../../application/useCases/network/CreateNetwork/ICreateNetworkUseCase";
import { ICreateNetworkDTO } from "../../../../domain/network/dtos/ICreateNetworkDTO";
import { INetworkOutputRequestDTO } from "../../../../domain/network/dtos/INetworkOutputRequestDTO";
import { IController } from "../../interface/IController";

export class CreateNetworkController implements IController<ICreateNetworkDTO, Partial<INetworkOutputRequestDTO>> {
    constructor(private readonly createNetworkUseCase: ICreateNetworkUseCase) { }

    async handle(request: ICreateNetworkDTO): Promise<Partial<INetworkOutputRequestDTO>> {
        const result = await this.createNetworkUseCase.execute(request);

        if (!result.success || !result.data) {
            throw result.error;
        }

        return {
            uuid: result.data.uuid,
            name: result.data.name,
            createdAt: result.data.createdAt,
            roles: result.data.roles
        }
    }
}
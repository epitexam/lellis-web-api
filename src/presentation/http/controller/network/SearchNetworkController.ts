import { ISearchNetworkUseCase } from "../../../../application/useCases/network/SearchNetwork/ISearchNetworkUseCase";
import { INetworkOutputRequestDTO } from "../../../../domain/network/dtos/INetworkOutputRequestDTO";
import { ISearchNetworkInputDTO } from "../../../../domain/network/dtos/ISearchNetworkInputDTO";
import { IController } from "../../interface/IController";

export class SearchNetworkController implements IController<ISearchNetworkInputDTO, INetworkOutputRequestDTO[]> {
    constructor(private readonly searchNetworkUseCase: ISearchNetworkUseCase) { }

    async handle(request: ISearchNetworkInputDTO): Promise<INetworkOutputRequestDTO[]> {
        const result = await this.searchNetworkUseCase.execute(request)

        if (!result.success || !result.data) {
            throw result.error;
        }

        return result.data
    }
}
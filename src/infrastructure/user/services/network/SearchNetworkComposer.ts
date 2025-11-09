import { INetworkRepository } from "../../../../application/repositories/INetworkRepository";
import { ISearchNetworkUseCase } from "../../../../application/useCases/network/SearchNetwork/ISearchNetworkUseCase";
import { SearchNetworkUseCase } from "../../../../application/useCases/network/SearchNetwork/SearchNetworkUseCase";
import { SearchNetworkController } from "../../../../presentation/http/controller/network/SearchNetworkController";
import { PrismaNetworkRepository } from "../../repositories/prisma/PrismaNetworkRepository";

export function SearchNetworkComposer() {
    const repository: INetworkRepository = new PrismaNetworkRepository();
    const useCase: ISearchNetworkUseCase = new SearchNetworkUseCase(repository);
    const controller = new SearchNetworkController(useCase)

    return controller
}
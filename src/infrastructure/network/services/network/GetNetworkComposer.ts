import { INetworkRepository } from "../../../../application/repositories/INetworkRepository";
import { GetNetworkUseCase } from "../../../../application/useCases/network/GetNetwork/GetNetworkUseCase";
import { IGetNetworkUseCase } from "../../../../application/useCases/network/GetNetwork/IGetNetworkUseCase";
import { GetNetworkController } from "../../../../presentation/http/controller/network/GetNetworkController";
import { PrismaNetworkRepository } from "../../../user/repositories/prisma/PrismaNetworkRepository";

export function GetNetworkComposer() {
    const repository: INetworkRepository = new PrismaNetworkRepository();
    const useCase: IGetNetworkUseCase = new GetNetworkUseCase(repository);
    const controller = new GetNetworkController(useCase)

    return controller
}
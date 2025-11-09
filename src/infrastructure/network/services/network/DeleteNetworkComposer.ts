import { INetworkRepository } from "../../../../application/repositories/INetworkRepository";
import { DeleteNetworkUseCase } from "../../../../application/useCases/network/DeleteNetwork/DeleteNetworkUseCase";
import { IDeleteNetworkUseCase } from "../../../../application/useCases/network/DeleteNetwork/IDeleteNetworkUseCase";
import { DeleteNetworkController } from "../../../../presentation/http/controller/network/DeleteNetworkController";
import { PrismaNetworkRepository } from "../../../user/repositories/prisma/PrismaNetworkRepository";

export function DeleteNetworkComposer() {
    const repository: INetworkRepository = new PrismaNetworkRepository();
    const useCase: IDeleteNetworkUseCase = new DeleteNetworkUseCase(repository);
    const controller = new DeleteNetworkController(useCase)

    return controller
}
import { INetworkRepository } from "../../../../application/repositories/INetworkRepository";
import { IUsersRepository } from "../../../../application/repositories/IUsersRepository";
import { CreateNetworkUseCase } from "../../../../application/useCases/network/CreateNetwork/CreateNetworkUseCase";
import { ICreateNetworkUseCase } from "../../../../application/useCases/network/CreateNetwork/ICreateNetworkUseCase";
import { CreateNetworkController } from "../../../../presentation/http/controller/network/CreateNetworkController";
import { PrismaNetworkRepository } from "../../repositories/prisma/PrismaNetworkRepository";
import { PrismaUserRepository } from "../../repositories/prisma/PrismaUserRepository";

export function CreateNetworkComposer() {
    const networkRepository: INetworkRepository = new PrismaNetworkRepository();
    const userRepository: IUsersRepository = new PrismaUserRepository();
    const useCase: ICreateNetworkUseCase = new CreateNetworkUseCase(networkRepository, userRepository)
    const controller = new CreateNetworkController(useCase)

    return controller
}
import { INetworkRepository } from "../../../../application/repositories/INetworkRepository";
import { IUsersRepository } from "../../../../application/repositories/IUsersRepository";
import { IUpdateNetworkUseCase } from "../../../../application/useCases/network/UpdateNetwork /IUpdateNetworkUseCase";
import { UpdateNetworkUseCase } from "../../../../application/useCases/network/UpdateNetwork /UpdateNetworkUseCase";
import { UpdateNetworkController } from "../../../../presentation/http/controller/network/UpdateNetworkController";
import { PrismaNetworkRepository } from "../../../user/repositories/prisma/PrismaNetworkRepository";
import { PrismaUserRepository } from "../../../user/repositories/prisma/PrismaUserRepository";

export function UpdateNetworkComposer() {
    const networkRepository: INetworkRepository = new PrismaNetworkRepository();
    const userRepository: IUsersRepository = new PrismaUserRepository();
    const useCase: IUpdateNetworkUseCase = new UpdateNetworkUseCase(networkRepository, userRepository);
    const controller = new UpdateNetworkController(useCase)

    return controller
}
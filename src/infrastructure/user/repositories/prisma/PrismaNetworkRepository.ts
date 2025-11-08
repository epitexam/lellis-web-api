import { INetworkRepository } from "../../../../application/repositories/INetworkRepository";
import { ICreateNetworkDTO } from "../../../../domain/network/dtos/ICreateNetworkDTO";
import { INetworkOutputRequestDTO } from "../../../../domain/network/dtos/INetworkOutputRequestDTO";
import { IUpdateNetworkRequestDTO } from "../../../../domain/network/dtos/IUpdateNetworkRequestDTO";

export class PrismaNetworkRepository implements INetworkRepository {
    create(data: ICreateNetworkDTO): Promise<INetworkOutputRequestDTO> {
        throw new Error("Method not implemented yet")
    }

    findAllNetworks(): Promise<INetworkOutputRequestDTO[]> {
        throw new Error("Method not implemented yet")
    }

    findNetworkById(id: string): Promise<INetworkOutputRequestDTO | null> {
        throw new Error("Method not implemented yet")
    }

    findNetworkByName(name: string): Promise<INetworkOutputRequestDTO[] | null> {
        throw new Error("Method not implemented yet")
    }

    updateNetwork(id: string, data: IUpdateNetworkRequestDTO): Promise<INetworkOutputRequestDTO> {
        throw new Error("Method not implemented yet")
    }
    
    deleteNetwork(id: string): Promise<Partial<INetworkOutputRequestDTO>> {
        throw new Error("Method not implemented yet")
    }

    addMemberToNetwork(userId: string, networkId: string): Promise<Partial<INetworkOutputRequestDTO>> {
        throw new Error("Method not implemented yet")
    }
}
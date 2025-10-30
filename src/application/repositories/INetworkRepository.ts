/**
 * Network Repository Interface
 *
 * This interface defines the contract for data persistence and retrieval
 * related to the Network entity.
 *
 * In a Clean Architecture setup, this repository serves as an abstraction
 * between the **domain/application layers** and the **infrastructure layer**.
 * Any concrete implementation (e.g., using a database, API, or in-memory storage)
 * must conform to this interface.
 */

import { ICreateNetworkDTO } from "../../domain/network/dtos/ICreateNetworkDTO";
import { INetworkOutputRequestDTO } from "../../domain/network/dtos/INetworkOutputRequestDTO";

/**
 * Represents the repository operations for the Network entity.
 */
export interface INetworkRepository {
    /**
     * Creates a new network.
     *
     * @param data - The data required to create a new network, defined by `ICreateNetworkDTO`.
     * @returns A promise that resolves with the newly created network as an `INetworkOutputRequestDTO`.
     *
     * @example
     * ```ts
     * const newNetwork = await networkRepository.create({
     *   name: "My Private Network",
     *   description: "Internal company network"
     * });
     * ```
     */
    create(data: ICreateNetworkDTO): Promise<INetworkOutputRequestDTO>;

    /**
     * Finds a network by its unique name.
     *
     * @param name - The name of the network to search for.
     * @returns A promise that resolves with the matching network (`INetworkOutputRequestDTO`),
     * or `null` if no network is found.
     *
     * @example
     * ```ts
     * const network = await networkRepository.findNetworkByName("CorporateLAN");
     * if (network) {
     *   console.log(network.id);
     * }
     * ```
     */
    findNetworkByName(name: string): Promise<INetworkOutputRequestDTO | null>;

    /**
     * Finds a network by its unique identifier.
     *
     * @param id - The unique ID of the network.
     * @returns A promise that resolves with the matching network (`INetworkOutputRequestDTO`),
     * or `null` if not found.
     *
     * @example
     * ```ts
     * const network = await networkRepository.findNetworkById("b9d2-88ef-23ac");
     * ```
     */
    findNetworkById(id: string): Promise<INetworkOutputRequestDTO | null>;

    /**
     * Retrieves all existing networks.
     *
     * @returns A promise that resolves with an array of `INetworkOutputRequestDTO` objects.
     *
     * @example
     * ```ts
     * const networks = await networkRepository.findAllNetworks();
     * console.log(`${networks.length} networks found`);
     * ```
     */
    findAllNetworks(): Promise<INetworkOutputRequestDTO[]>;

    /**
     * Updates an existing network.
     *
     * @param id - The unique ID of the network to update.
     * @param data - A partial object containing the fields to update.
     * @returns A promise that resolves with the updated network (`INetworkOutputRequestDTO`).
     *
     * @example
     * ```ts
     * const updated = await networkRepository.updateNetwork("123", { description: "Updated description" });
     * ```
     */
    updateNetwork(id: string, data: Partial<ICreateNetworkDTO>): Promise<INetworkOutputRequestDTO>;

    /**
     * Deletes a network by its unique identifier.
     *
     * @param id - The unique ID of the network to delete.
     * @returns A promise that resolves once the network has been deleted.
     *
     * @example
     * ```ts
     * await networkRepository.deleteNetwork("123");
     * ```
     */
    deleteNetwork(id: string): Promise<void>;
}

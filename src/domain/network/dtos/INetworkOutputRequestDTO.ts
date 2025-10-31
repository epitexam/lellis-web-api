/**
 * @file INetworkOutputRequestDTO.ts
 * @description
 * Data Transfer Object (DTO) representing a serialized view of the {@link Network} entity.
 * This DTO is intended to be returned as part of a {@link IUseCaseResult<INetworkOutputRequestDTO>}.
 *
 * It focuses strictly on domain data and omits metadata like `success` or `error`,
 * which are handled by the outer use case result wrapper.
 *
 * @example
 * ```ts
 * const result: IUseCaseResult<INetworkOutputRequestDTO> = {
 *   success: true,
 *   data: {
 *     uuid: "uuid-123",
 *     name: "Hospital A",
 *     adminId: "user-uuid",
 *     members: [{ userId: "user-uuid", roleId: "ADMIN" }],
 *     roles: [{ name: "DOCTOR", permissions: [{ action: "READ", resource: "PATIENT" }] }],
 *     resources: [{ id: "res-1", name: "Dashboard", ownerId: "user-uuid" }],
 *     createdAt: "2025-01-01T12:00:00Z",
 *     updatedAt: "2025-01-01T12:00:00Z"
 *   }
 * };
 * ```
 */
export interface INetworkOutputRequestDTO {
    /** Unique identifier of the network. */
    uuid: string;

    /** Display name of the network. */
    name: string;

    /** UUID of the network administrator. */
    adminId: string;

    /** Members of the network with their assigned roles. */
    members: { userId: string; roleId: string }[];

    /** Defined roles and their corresponding permissions. */
    roles: { name: string; permissions: { action: string; resource: string }[] }[];

    /** List of resources registered within the network. */
    resources: { id: string; name: string; ownerId: string }[];

    /** Timestamp of creation. */
    createdAt: Date;

    /** Timestamp of last update. */
    updatedAt: Date;
}

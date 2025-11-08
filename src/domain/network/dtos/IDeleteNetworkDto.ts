/**
 * @file IDeleteNetworkDTO.ts
 * @description
 * Data Transfer Object (DTO) defining the input required to delete a {@link Network} entity.
 *
 * This DTO is used by the {@link DeleteNetworkUseCase} to perform a controlled deletion
 * of a network while ensuring authorization and data integrity.
 *
 * It represents the minimal set of information needed to:
 * - Identify the target network to delete.
 * - Verify that the requesting user is the network's administrator.
 *
 * @example
 * ```typescript
 * const deletePayload: IDeleteNetworkDTO = {
 *   networkId: "network-uuid-1234",
 *   adminId: "user-uuid-5678"
 * };
 *
 * const result = await deleteNetworkUseCase.execute(deletePayload);
 * if (result.success) {
 *   console.log("Network deleted:", result.data.uuid);
 * } else {
 *   console.error("Error:", result.error);
 * }
 * ```
 */
export interface IDeleteNetworkDTO {
    /**
     * The unique identifier (UUID) of the network to delete.
     *
     * Used to locate the corresponding {@link Network} entity in the repository.
     * @example "network-uuid-1234"
     */
    networkId: string;

    /**
     * The unique identifier (UUID) of the administrator requesting the deletion.
     *
     * Used to validate authorization and ensure that only the network’s admin
     * can perform destructive operations.
     * @example "user-uuid-5678"
     */
    adminId: string;
}

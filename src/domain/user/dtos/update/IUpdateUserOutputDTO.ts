/**
 * @file IUpdateUserOutputDTO.ts
 * @description
 * Data Transfer Object (DTO) representing the response after updating a user.
 *
 * This DTO is typically returned by the `UpdateUserUseCase` and sent
 * back to the client through the controller or HTTP layer.
 *
 * It contains the minimal set of data that identifies the updated user.
 *
 * @example
 * ```ts
 * const updatedUser: IUpdateUserOutputDTO = {
 *   user_id: "b8a6e550-7b4e-4e8b-9d8b-3bdfb9d6a31f",
 * };
 * ```
 */
export interface IUpdateUserOutputDTO {
    /**
     * Unique identifier of the updated user.
     * 
     * @example "b8a6e550-7b4e-4e8b-9d8b-3bdfb9d6a31f"
     */
    user_id: string;
}

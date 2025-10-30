/**
 * @file ICreatePermissionDTO.ts
 * @description
 * Data Transfer Object for creating a new {@link Permission} within a role.
 *
 * This DTO is used to transfer permission creation data from the presentation layer
 * to the application layer, ensuring type safety and validation at the boundary
 * of the domain.
 *
 * @example
 * ```ts
 * const dto: ICreatePermissionDTO = {
 *   networkId: "uuid-of-network",
 *   roleName: "DOCTOR",
 *   permission: {
 *     action: "READ",
 *     resource: "PATIENT_FILE"
 *   }
 * };
 * ```
 */
export interface ICreatePermissionDTO {
    /**
     * The unique identifier of the network where the role exists.
     * @example "a1b2c3d4-e5f6-7890-1234-567890abcdef"
     */
    networkId: string;

    /**
     * The name of the role to add the permission to.
     * @example "DOCTOR"
     */
    roleName: string;

    /**
     * The permission to add to the role.
     * Defines an action on a specific resource.
     * @example { action: "READ", resource: "PATIENT_FILE" }
     */
    permission: {
        /**
         * The action to allow (e.g. "READ", "WRITE", "DELETE").
         * @example "READ"
         */
        action: string;

        /**
         * The resource on which the action is allowed (e.g. "PATIENT_FILE", "REPORT").
         * @example "PATIENT_FILE"
         */
        resource: string;
    };
}
/**
 * @file ICreateRoleDTO.ts
 * @description
 * Data Transfer Object for creating a new {@link Role} within a network.
 *
 * This DTO is used to transfer role creation data from the presentation layer
 * to the application layer, ensuring type safety and validation at the boundary
 * of the domain.
 *
 * @example
 * ```ts
 * const dto: ICreateRoleDTO = {
 *   networkId: "uuid-of-network",
 *   roleName: "DOCTOR",
 *   permissions: [
 *     { action: "READ", resource: "PATIENT_FILE" },
 *     { action: "WRITE", resource: "PRESCRIPTION" }
 *   ]
 * };
 * ```
 */
export interface ICreateRoleDTO {
    /**
     * The unique identifier of the network where the role will be created.
     * @example "a1b2c3d4-e5f6-7890-1234-567890abcdef"
     */
    networkId: string;

    /**
     * The name of the role to create (e.g. "DOCTOR", "NURSE", "ADMIN").
     * Must be unique within the network.
     * @example "DOCTOR"
     */
    roleName: string;

    /**
     * An array of permissions to assign to the role.
     * Each permission defines an action on a specific resource.
     * @example [{ action: "READ", resource: "PATIENT_FILE" }]
     */
    permissions: Array<{
        action: string;
        resource: string;
    }>;
}
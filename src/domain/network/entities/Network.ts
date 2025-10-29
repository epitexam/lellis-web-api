import { Role } from "../valueObjects/Role";
import { Permission } from "../valueObjects/Permission";
import { NetworkError, NetworkErrorType } from "../enums/NetworkErrorType";
import { RoleError, RoleErrorType } from "../enums/RoleErrorType";
import { User } from "../../user/entities/User";

/**
 * @file Network.ts
 * @description
 * Represents an isolated collaboration space (e.g. a hospital department, company workspace)
 * where users interact through roles and permissions.
 *
 * Each {@link Network} has:
 * - An administrator (the creator)
 * - A list of members (Users with assigned roles)
 * - A set of roles (Role objects)
 * - A collection of resources that can be protected via permissions
 *
 * This entity is the **aggregate root** for the Network bounded context.
 * It enforces invariants and ensures consistency across members, roles, and permissions.
 *
 * @example
 * ```ts
 * const network = new Network(uuid, "Hospital A", adminUser);
 * const doctorRole = new Role("DOCTOR", [new Permission("READ", "PATIENT_FILE")]);
 * network.addRole(doctorRole);
 * network.addMember(doctorUser, "DOCTOR");
 * ```
 */
export class Network {
    /**
     * The unique identifier of the network.
     * @private
     */
    private _uuid: string;

    /**
     * The display name of the network (e.g. "Hospital A").
     * @private
     */
    private _name: string;

    /**
     * The unique identifier of the network's administrator.
     * @private
     */
    private _adminId: User["uuid"];

    /**
     * Maps user IDs to their assigned role IDs within the network.
     * @private
     */
    private _members: Map<string, { userId: User["uuid"]; roleId: string }>;

    /**
     * Maps role names to their {@link Role} objects.
     * @private
     */
    private _roles: Map<string, Role>;

    /**
     * Maps resource IDs to their metadata (name, owner).
     * @private
     */
    private _resources: Map<string, { name: string; ownerId: User["uuid"] }>;

    /**
     * The timestamp when the network was created.
     * @private
     */
    private _createdAt: Date;

    /**
     * The timestamp when the network was last updated.
     * @private
     */
    private _updatedAt: Date;

    /**
     * Creates a new {@link Network}.
     *
     * @param {string} uuid - The unique identifier for the network.
     * @param {string} name - The network’s display name.
     * @param {User} admin - The admin user for this network.
     *
     * @throws {NetworkError} If name or admin is missing.
     */
    constructor(uuid: string, name: string, admin: User) {
        if (!name) throw new NetworkError(NetworkErrorType.EMPTY_NAME);
        if (!admin) throw new NetworkError(NetworkErrorType.MISSING_ADMIN);

        this._uuid = uuid;
        this._name = name;
        this._adminId = admin.uuid;
        this._members = new Map();
        this._roles = new Map();
        this._resources = new Map();
        this._createdAt = new Date();
        this._updatedAt = new Date();

        // Initialize default ADMIN role and assign admin user
        const adminRole = new Role("ADMIN", [
            new Permission("READ", "ALL"),
            new Permission("WRITE", "ALL"),
            new Permission("DELETE", "ALL"),
        ]);
        this._roles.set("ADMIN", adminRole);
        this._members.set(admin.uuid, { userId: admin.uuid, roleId: "ADMIN" });
    }

    get uuid(): string { return this._uuid; }
    get name(): string { return this._name; }
    get adminId(): string { return this._adminId; }
    get members(): Map<string, { userId: User["uuid"]; roleId: string }> { return this._members; }
    get roles(): Map<string, Role> { return this._roles; }
    get resources(): Map<string, { name: string; ownerId: User["uuid"] }> { return this._resources; }

    /**
     * Checks if a user is the network administrator.
     * @param {User} user - The user to check.
     * @returns {boolean} True if the user is the admin.
     */
    isAdmin(user: User): boolean {
        return this._adminId === user.uuid;
    }

    /**
     * Adds a new role to the network.
     * @param {Role} role - The role to add.
     * @throws {RoleError} If the role already exists.
     */
    addRole(role: Role): void {
        if (this._roles.has(role.name)) throw new RoleError(RoleErrorType.DUPLICATE_ROLE);
        this._roles.set(role.name, role);
        this._updatedAt = new Date();
    }

    /**
     * Updates an existing role in the network.
     * @param {string} roleName - The name of the role to update.
     * @param {Role} newRole - The updated role object.
     * @throws {RoleError} If the role does not exist.
     */
    updateRole(roleName: string, newRole: Role): void {
        if (!this._roles.has(roleName)) throw new RoleError(RoleErrorType.ROLE_NOT_FOUND);
        this._roles.set(roleName, newRole);
        this._updatedAt = new Date();
    }

    /**
     * Removes a role from the network.
     * @param {string} roleName - The name of the role to remove.
     * @throws {RoleError} If the role does not exist.
     * @throws {RoleError} If the role is currently assigned to members.
     */
    removeRole(roleName: string): void {
        if (!this._roles.has(roleName)) throw new RoleError(RoleErrorType.ROLE_NOT_FOUND);

        // Vérifier que le rôle n'est pas attribué à des membres
        for (const member of this._members.values()) {
            if (member.roleId === roleName) {
                throw new RoleError(RoleErrorType.ROLE_IN_USE);
            }
        }

        this._roles.delete(roleName);
        this._updatedAt = new Date();
    }

    /**
     * Assigns an existing role to a member.
     * @param {User} user - The user to update.
     * @param {string} roleName - The name of the role to assign.
     *
     * @throws {NetworkError} If the user is not part of the network.
     * @throws {RoleError} If the role does not exist.
     */
    assignRoleToUser(user: User, roleName: string): void {
        const role = this._roles.get(roleName.toUpperCase());
        if (!role) throw new RoleError(RoleErrorType.ROLE_NOT_FOUND);
        const member = this._members.get(user.uuid);
        if (!member) throw new NetworkError(NetworkErrorType.USER_NOT_FOUND);

        this._members.set(user.uuid, { userId: user.uuid, roleId: role.name });
        this._updatedAt = new Date();
    }

    /**
     * Adds a user to the network with a given role.
     * @param {User} user - The user to add.
     * @param {string} roleName - The role to assign.
     *
     * @throws {NetworkError} If the user already exists.
     * @throws {RoleError} If the role does not exist.
     */
    addMember(user: User, roleName: string): void {
        if (this._members.has(user.uuid)) throw new NetworkError(NetworkErrorType.USER_ALREADY_IN_NETWORK);

        const role = this._roles.get(roleName.toUpperCase());
        if (!role) throw new RoleError(RoleErrorType.ROLE_NOT_FOUND);

        this._members.set(user.uuid, { userId: user.uuid, roleId: role.name });
        this._updatedAt = new Date();
    }

    /**
     * Removes a user from the network.
     * @param {User} user - The user to remove.
     * @throws {NetworkError} If the user is not part of the network.
     * @throws {NetworkError} If the user is the admin (cannot remove admin).
     */
    removeMember(user: User): void {
        if (user.uuid === this._adminId) {
            throw new NetworkError(NetworkErrorType.CANNOT_REMOVE_ADMIN);
        }

        if (!this._members.has(user.uuid)) throw new NetworkError(NetworkErrorType.USER_NOT_FOUND);

        this._members.delete(user.uuid);
        this._updatedAt = new Date();
    }

    /**
     * Checks if a member has permission to perform an action.
     *
     * @param {User} user - The user to check.
     * @param {Permission} permission - The permission to verify.
     * @returns {boolean} Whether the user has the required permission.
     */
    canUser(user: User, permission: Permission): boolean {
        const member = this._members.get(user.uuid);
        if (!member) return false;

        const role = this._roles.get(member.roleId);
        if (!role) return false;

        return role.hasPermission(permission);
    }

    /**
     * Checks if a user can access a specific resource.
     * @param {User} user - The user requesting access.
     * @param {string} resourceId - The ID of the resource.
     * @returns {boolean} True if the user has access to the resource.
     */
    canAccessResource(user: User, resourceId: string): boolean {
        const resource = this._resources.get(resourceId);
        if (!resource) return false;

        // Si le propriétaire, accès garanti
        if (resource.ownerId === user.uuid) return true;

        // Sinon, vérifier les permissions
        const readPermission = new Permission("READ", resourceId);
        return this.canUser(user, readPermission);
    }

    /**
     * Adds a resource to the network.
     * @param {string} resourceId - Unique ID of the resource.
     * @param {string} name - Display name of the resource.
     * @param {User} owner - The user who owns the resource.
     */
    addResource(resourceId: string, name: string, owner: User): void {
        this._resources.set(resourceId, { name, ownerId: owner.uuid });
        this._updatedAt = new Date();
    }

    /**
     * Removes a resource from the network.
     * @param {string} resourceId - The ID of the resource to remove.
     * @throws {NetworkError} If the resource does not exist.
     */
    removeResource(resourceId: string): void {
        if (!this._resources.has(resourceId)) throw new NetworkError(NetworkErrorType.RESOURCE_NOT_FOUND);
        this._resources.delete(resourceId);
        this._updatedAt = new Date();
    }

    /**
     * Serializes the {@link Network} into a JSON-safe object.
     * Note: This method does NOT serialize full User/Role objects for security/performance.
     * Only their IDs and names are included.
     */
    toJSON() {
        return {
            uuid: this._uuid,
            name: this._name,
            adminId: this._adminId,
            members: Array.from(this._members.entries()).map(([userId, data]) => ({
                userId,
                roleId: data.roleId,
            })),
            roles: Array.from(this._roles.entries()).map(([name, role]) => ({
                name,
                permissions: role.permissions.map(p => p.toJSON()),
            })),
            resources: Array.from(this._resources.entries()).map(([id, data]) => ({
                id,
                name: data.name,
                ownerId: data.ownerId,
            })),
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
        };
    }
}
import { Permission } from "../../permission/valueObjects/Permission";
import { NetworkError, NetworkErrorType } from "../enums/NetworkErrorType";
import { RoleError, RoleErrorType } from "../../role/enums/RoleErrorType";
import { Role } from "../../role/entities/Role";

/**
 * @file Network.ts
 * @description
 * Aggregate root representing a collaborative network or workspace within the system.
 *
 * A {@link Network} models an isolated environment where users interact through assigned
 * roles and permissions. It ensures domain invariants such as:
 * - Each network must have exactly one administrator.
 * - A user cannot belong to the same network twice.
 * - Roles must be unique within a given network.
 *
 * This entity maintains the mapping between users, roles, and resources without depending
 * on external aggregates (like `User`). Instead, it uses user identifiers to preserve
 * aggregate boundaries.
 *
 * @example
 * ```ts
 * const network = new Network("uuid-123", "Hospital A", "admin-uuid");
 * const doctorRole = new Role("DOCTOR", [new Permission("READ", "PATIENT_FILE")]);
 * network.addRole(doctorRole);
 * network.addMember("user-uuid", "DOCTOR");
 * ```
 */
export class Network {
    /** Unique identifier of the network (aggregate root). */
    private _uuid: string;

    /** Human-readable name of the network (e.g. "Cardiology Department"). */
    private _name: string;

    /** UUID of the administrator of the network. */
    private _adminId: string;

    /** Map of network members. Keys are user IDs, values are assigned role IDs. */
    private _members: Map<string, { userId: string; roleId: string }>;

    /** Map of available roles in this network. Keys are role names, values are Role objects. */
    private _roles: Map<string, Role>;

    /** Map of resources within this network. Each resource is linked to an owner ID. */
    private _resources: Map<string, { name: string; ownerId: string }>;

    /** Timestamp when the network was created. */
    private _createdAt: Date;

    /** Timestamp when the network was last updated. */
    private _updatedAt: Date;

    /**
     * Creates a new {@link Network} aggregate root.
     *
     * @param {string} uuid - Unique identifier for the network.
     * @param {string} name - Display name for the network.
     * @param {string} adminId - UUID of the network administrator.
     *
     * @throws {NetworkError} If the name or adminId are missing.
     */
    constructor(uuid: string, name: string, adminId: string) {
        if (!name) throw new NetworkError(NetworkErrorType.EMPTY_NAME);
        if (!adminId) throw new NetworkError(NetworkErrorType.MISSING_ADMIN);

        this._uuid = uuid;
        this._name = name;
        this._adminId = adminId;
        this._members = new Map();
        this._roles = new Map();
        this._resources = new Map();
        this._createdAt = new Date();
        this._updatedAt = new Date();

        // Default ADMIN role with full access permissions
        const adminRole = new Role("ADMIN", [
            new Permission("READ", "ALL"),
            new Permission("WRITE", "ALL"),
            new Permission("DELETE", "ALL"),
        ]);

        this._roles.set("ADMIN", adminRole);
        this._members.set(adminId, { userId: adminId, roleId: "ADMIN" });
    }

    /** Returns the unique identifier of the network. */
    get uuid(): string {
        return this._uuid;
    }

    /** Returns the display name of the network. */
    get name(): string {
        return this._name;
    }

    /** Returns the UUID of the administrator. */
    get adminId(): string {
        return this._adminId;
    }

    /** Returns the map of network members. */
    get members(): Map<string, { userId: string; roleId: string }> {
        return this._members;
    }

    /** Returns the map of roles in the network. */
    get roles(): Map<string, Role> {
        return this._roles;
    }

    /** Returns the map of resources in the network. */
    get resources(): Map<string, { name: string; ownerId: string }> {
        return this._resources;
    }

    /**
     * Checks whether a user is the administrator of the network.
     * @param {string} userId - UUID of the user to check.
     * @returns {boolean} True if the user is the administrator.
     */
    isAdmin(userId: string): boolean {
        return this._adminId === userId;
    }

    /**
     * Adds a new role to the network.
     * @param {Role} role - The role to add.
     * @throws {RoleError} If the role already exists.
     */
    addRole(role: Role): void {
        if (this._roles.has(role.name)) {
            throw new RoleError(RoleErrorType.DUPLICATE_ROLE);
        }
        this._roles.set(role.name, role);
        this._updatedAt = new Date();
    }

    /**
     * Updates an existing role within the network.
     * @param {string} roleName - The name of the role to update.
     * @param {Role} newRole - The updated role object.
     * @throws {RoleError} If the role does not exist.
     */
    updateRole(roleName: string, newRole: Role): void {
        if (!this._roles.has(roleName)) {
            throw new RoleError(RoleErrorType.ROLE_NOT_FOUND);
        }
        this._roles.set(roleName, newRole);
        this._updatedAt = new Date();
    }

    /**
     * Removes a role from the network.
     * @param {string} roleName - The name of the role to remove.
     * @throws {RoleError} If the role does not exist or is assigned to members.
     */
    removeRole(roleName: string): void {
        if (!this._roles.has(roleName)) {
            throw new RoleError(RoleErrorType.ROLE_NOT_FOUND);
        }

        for (const member of this._members.values()) {
            if (member.roleId === roleName) {
                throw new RoleError(RoleErrorType.ROLE_IN_USE);
            }
        }

        this._roles.delete(roleName);
        this._updatedAt = new Date();
    }

    /**
     * Adds a user to the network with a specific role.
     * @param {string} userId - UUID of the user to add.
     * @param {string} roleName - Role name to assign.
     * @throws {NetworkError} If the user already exists.
     * @throws {RoleError} If the role does not exist.
     */
    addMember(userId: string, roleName: string): void {
        if (this._members.has(userId)) {
            throw new NetworkError(NetworkErrorType.USER_ALREADY_IN_NETWORK);
        }

        const role = this._roles.get(roleName.toUpperCase());
        if (!role) {
            throw new RoleError(RoleErrorType.ROLE_NOT_FOUND);
        }

        this._members.set(userId, { userId, roleId: role.name });
        this._updatedAt = new Date();
    }

    /**
     * Removes a member from the network.
     * @param {string} userId - UUID of the user to remove.
     * @throws {NetworkError} If the user is not found or is the admin.
     */
    removeMember(userId: string): void {
        if (userId === this._adminId) {
            throw new NetworkError(NetworkErrorType.CANNOT_REMOVE_ADMIN);
        }

        if (!this._members.has(userId)) {
            throw new NetworkError(NetworkErrorType.USER_NOT_FOUND);
        }

        this._members.delete(userId);
        this._updatedAt = new Date();
    }

    /**
     * Assigns a new role to an existing member.
     * @param {string} userId - UUID of the member.
     * @param {string} roleName - New role name to assign.
     * @throws {NetworkError} If the user is not part of the network.
     * @throws {RoleError} If the role does not exist.
     */
    assignRoleToUser(userId: string, roleName: string): void {
        const role = this._roles.get(roleName.toUpperCase());
        if (!role) {
            throw new RoleError(RoleErrorType.ROLE_NOT_FOUND);
        }

        const member = this._members.get(userId);
        if (!member) {
            throw new NetworkError(NetworkErrorType.USER_NOT_FOUND);
        }

        this._members.set(userId, { userId, roleId: role.name });
        this._updatedAt = new Date();
    }

    /**
     * Checks whether a user has a specific permission in this network.
     * @param {string} userId - UUID of the user.
     * @param {Permission} permission - Permission to verify.
     * @returns {boolean} True if the user has the required permission.
     */
    canUser(userId: string, permission: Permission): boolean {
        const member = this._members.get(userId);
        if (!member) return false;

        const role = this._roles.get(member.roleId);
        if (!role) return false;

        return role.hasPermission(permission);
    }

    /**
     * Adds a resource to the network.
     * @param {string} resourceId - Unique identifier of the resource.
     * @param {string} name - Display name of the resource.
     * @param {string} ownerId - UUID of the resource owner.
     */
    addResource(resourceId: string, name: string, ownerId: string): void {
        this._resources.set(resourceId, { name, ownerId });
        this._updatedAt = new Date();
    }

    /**
     * Removes a resource from the network.
     * @param {string} resourceId - Identifier of the resource to remove.
     * @throws {NetworkError} If the resource does not exist.
     */
    removeResource(resourceId: string): void {
        if (!this._resources.has(resourceId)) {
            throw new NetworkError(NetworkErrorType.RESOURCE_NOT_FOUND);
        }
        this._resources.delete(resourceId);
        this._updatedAt = new Date();
    }

    /**
     * Serializes the Network aggregate to a plain JSON object.
     * This method intentionally omits entity references (e.g., User)
     * to ensure clean, lightweight transfer of data.
     *
     * @returns {object} JSON-safe representation of the network.
     */
    toJSON() {
        return {
            uuid: this._uuid,
            name: this._name,
            adminId: this._adminId,
            members: Array.from(this._members.values()),
            roles: Array.from(this._roles.values()).map(role => role.toJSON()),
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

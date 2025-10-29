import { User } from "../../user/entities/User";
import { NetworkError, NetworkErrorType } from "../enums/NetworkErrorType";
import { RoleError, RoleErrorType } from "../enums/RoleErrorType";
import { Role } from "../valueObjects/Role";

/**
 * @file Network.ts
 * @description
 * Represents a logical network (or service domain) within the system.
 * 
 * A Network acts as an aggregate root that manages:
 * - its users (members),
 * - their roles and permissions within this context,
 * - and the resources shared inside it.
 * 
 * Typical examples include service departments in a hospital:
 * “Chirurgie”, “Radiologie”, or “Urgences”.
 * 
 * Each Network has a unique administrator and a list of users who can hold
 * specific roles with contextual permissions.
 * 
 * This class enforces domain invariants such as:
 * - A Network cannot exist without a name or admin.
 * - A user cannot join the same Network twice.
 * - Roles must be unique within the same Network.
 * - The admin cannot be removed.
 * 
 * @example
 * ```typescript
 * const admin = User.create({
 *   first_name: "Alice",
 *   last_name: "Martin",
 *   email: "alice.martin@hopital.fr",
 *   password: "secure_password_123"
 * });
 *
 * const network = new Network(Bun.randomUUIDv7(), "Radiologie", admin);
 *
 * // Add a role
 * const doctorRole = new Role("DOCTOR");
 * network.addRole(doctorRole);
 *
 * // Add a new user
 * const user = User.create({
 *   first_name: "Paul",
 *   last_name: "Durand",
 *   email: "paul.durand@hopital.fr",
 *   password: "secure_password_456"
 * });
 *
 * network.addMember(user, "DOCTOR");
 * ```
 */
export class Network {
    /**
     * Unique identifier for the network.
     * @private
     */
    private _uuid: string;

    /**
     * Human-readable name of the network.
     * Example: "Radiologie" or "Chirurgie".
     * @private
     */
    private _name: string;

    /**
     * The user who administrates the network.
     * @private
     */
    private _admin: User;

    /**
     * All users that belong to this network, along with their assigned roles.
     * Stored as a map: `userUuid -> { user, role }`.
     * @private
     */
    private _members: Map<string, { user: User; role: Role }>;

    /**
     * All available roles defined within this network.
     * Stored as a map: `roleName -> Role instance`.
     * @private
     */
    private _roles: Map<string, Role>;

    /**
     * Any resources (documents, datasets, assets, etc.) shared in this network.
     * @private
     */
    private _resources: any[];

    /**
     * Date and time when this network was created.
     * @private
     */
    private _createdAt: Date;

    /**
     * Date and time when this network was last updated.
     * @private
     */
    private _updatedAt: Date;

    /**
     * Creates a new Network instance.
     *
     * @param {string} uuid - Unique identifier for the network.
     * @param {string} name - Name of the network (cannot be empty).
     * @param {User} admin - The administrator of the network.
     *
     * @throws {NetworkError} If the name is empty or admin is missing.
     */
    constructor(uuid: string, name: string, admin: User) {
        if (!name) throw new NetworkError(NetworkErrorType.EMPTY_NAME);
        if (!admin) throw new NetworkError(NetworkErrorType.MISSING_ADMIN);

        this._uuid = uuid;
        this._name = name;
        this._admin = admin;
        this._members = new Map([[admin.uuid, { user: admin, role: new Role("ADMIN") }]]);
        this._roles = new Map([["ADMIN", new Role("ADMIN")]]);
        this._resources = [];
        this._createdAt = new Date();
        this._updatedAt = new Date();
    }

    /** @returns {string} The unique identifier of the network. */
    get uuid(): string { return this._uuid; }

    /** @returns {string} The human-readable name of the network. */
    get name(): string { return this._name; }

    /** @returns {User} The administrator of the network. */
    get admin(): User { return this._admin; }

    /** @returns {Map<string, { user: User; role: Role }>} All network members with their assigned roles. */
    get members(): Map<string, { user: User; role: Role }> { return this._members; }

    /** @returns {Map<string, Role>} All available roles within this network. */
    get roles(): Map<string, Role> { return this._roles; }

    // --------------------------------------------------------
    // Domain Methods
    // --------------------------------------------------------

    /**
     * Registers a new available role for this network.
     *
     * @param {Role} role - The role to add.
     *
     * @throws {RoleError} If the role already exists.
     */
    addRole(role: Role): void {
        if (this._roles.has(role.name.toUpperCase())) {
            throw new RoleError(RoleErrorType.DUPLICATE_ROLE);
        }

        this._roles.set(role.name.toUpperCase(), role);
        this._updatedAt = new Date();
    }

    /**
     * Assigns an existing role to a member already in the network.
     *
     * @param {User} user - The user to assign the role to.
     * @param {string} roleName - The name of the role to assign.
     *
     * @throws {NetworkError} If the user is not in the network.
     * @throws {RoleError} If the specified role does not exist.
     */
    assignRoleToUser(user: User, roleName: string): void {
        const role = this._roles.get(roleName.toUpperCase());
        if (!role) throw new RoleError(RoleErrorType.DUPLICATE_ROLE);
        if (!this._members.has(user.uuid)) throw new NetworkError(NetworkErrorType.USER_NOT_FOUND);

        this._members.set(user.uuid, { user, role });
        this._updatedAt = new Date();
    }

    /**
     * Adds a new member to the network with a given role.
     * If the role does not yet exist, it will be created automatically.
     *
     * @param {User} user - The user to add as a member.
     * @param {string} roleName - The role to assign to the user.
     *
     * @throws {NetworkError} If the user already belongs to this network.
     */
    addMember(user: User, roleName: string): void {
        if (this._members.has(user.uuid)) {
            throw new NetworkError(NetworkErrorType.USER_ALREADY_IN_NETWORK);
        }

        let role = this._roles.get(roleName.toUpperCase());
        if (!role) {
            role = new Role(roleName.toUpperCase());
            this._roles.set(roleName.toUpperCase(), role);
        }

        this._members.set(user.uuid, { user, role });
        this._updatedAt = new Date();
    }

    /**
     * Removes a user from the network.
     *
     * @param {User} user - The user to remove.
     *
     * @throws {NetworkError} If the user is not found or is the admin.
     */
    removeMember(user: User): void {
        if (!this._members.has(user.uuid)) throw new NetworkError(NetworkErrorType.USER_NOT_FOUND);
        if (user.uuid === this._admin.uuid) throw new NetworkError(NetworkErrorType.CANNOT_REMOVE_ADMIN);

        this._members.delete(user.uuid);
        this._updatedAt = new Date();
    }

    /**
     * Adds a resource (document, dataset, etc.) to the network.
     *
     * @param {any} resource - The resource to add.
     */
    addResource(resource: any): void {
        this._resources.push(resource);
        this._updatedAt = new Date();
    }

    /**
     * Converts the current Network instance into a plain JSON object.
     * This is typically used for data transfer (DTO).
     *
     * @returns {object} A serializable representation of the network.
     */
    toJSON() {
        return {
            uuid: this._uuid,
            name: this._name,
            admin: this._admin.toJSON(),
            members: Array.from(this._members.values()).map(m => ({
                user: m.user.toJSON(),
                role: m.role.toJSON()
            })),
            roles: Array.from(this._roles.values()).map(r => r.toJSON()),
            resources: this._resources,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt
        };
    }
}

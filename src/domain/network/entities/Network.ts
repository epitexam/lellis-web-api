import { User } from "../../user/entities/User";
import { Role } from "../valueObjects/Role";

/**
 * Represents a network (service) in the system.
 * Users can have different roles with different permissions within this network.
 */
export class Network {
    private _uuid: string;
    private _name: string;
    private _admin: User;
    private _members: Map<string, { user: User; role: Role }>;
    private _resources: any[]; // Replace `any` with a proper Resource class if defined
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(uuid: string, name: string, admin: User) {
        if (!name) throw new Error("Network name cannot be empty.");
        if (!admin) throw new Error("Network must have an admin.");

        this._uuid = uuid;
        this._name = name;
        this._admin = admin;
        this._members = new Map([[admin.uuid, { user: admin, role: new Role("ADMIN") }]]);
        this._resources = [];
        this._createdAt = new Date();
        this._updatedAt = new Date();
    }

    get uuid(): string { return this._uuid; }
    get name(): string { return this._name; }
    set name(newName: string) {
        if (!newName) throw new Error("Network name cannot be empty.");
        this._name = newName;
        this._updatedAt = new Date();
    }

    get admin(): User { return this._admin; }

    get members(): Map<string, { user: User; role: Role }> {
        return this._members;
    }

    get resources(): any[] { return this._resources; }

    /**
     * Adds a user to the network with a role.
     */
    addMember(user: User, role: Role): void {
        if (this._members.has(user.uuid)) throw new Error("User already in network.");
        this._members.set(user.uuid, { user, role });
        this._updatedAt = new Date();
    }

    /**
     * Removes a member from the network.
     */
    removeMember(user: User): void {
        if (!this._members.has(user.uuid)) throw new Error("User not found in network.");
        if (user.uuid === this._admin.uuid) throw new Error("Cannot remove the admin.");
        this._members.delete(user.uuid);
        this._updatedAt = new Date();
    }

    /**
     * Changes the role of a user in the network.
     */
    setUserRole(user: User, role: Role): void {
        if (!this._members.has(user.uuid)) throw new Error("User not found in network.");
        this._members.set(user.uuid, { user, role });
        this._updatedAt = new Date();
    }

    /**
     * Adds a resource to the network.
     */
    addResource(resource: any): void {
        this._resources.push(resource);
        this._updatedAt = new Date();
    }

    /**
     * Serializes the network to JSON.
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
            resources: this._resources,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt
        };
    }
}

import { Permission } from "./Permission";

/**
 * Represents a role in a network with dynamic permissions.
 */
export class Role {
    private _name: string;
    private _permissions: Permission[];

    /**
     * Creates a new Role instance.
     * @param {string} name - Name of the role.
     * @param {Permission[]} permissions - Optional initial permissions.
     */
    constructor(name: string, permissions: Permission[] = []) {
        if (!name) throw new Error("Role name cannot be empty.");
        this._name = name.toUpperCase();
        this._permissions = permissions;
    }

    get name(): string {
        return this._name;
    }

    set name(newName: string) {
        if (!newName) throw new Error("Role name cannot be empty.");
        this._name = newName.toUpperCase();
    }

    get permissions(): Permission[] {
        return this._permissions;
    }

    /**
     * Adds a permission if not already present.
     * @param {Permission} permission
     */
    addPermission(permission: Permission): void {
        if (!this._permissions.some(p => p.equals(permission))) {
            this._permissions.push(permission);
        }
    }

    /**
     * Removes a permission if present.
     * @param {Permission} permission
     */
    removePermission(permission: Permission): void {
        this._permissions = this._permissions.filter(p => !p.equals(permission));
    }

    /**
     * Checks if the role has a specific permission.
     * @param {Permission} permission
     * @returns {boolean}
     */
    hasPermission(permission: Permission): boolean {
        return this._permissions.some(p => p.equals(permission));
    }

    /**
     * Serialize to JSON
     * @returns {object}
     */
    toJSON() {
        return {
            name: this._name,
            permissions: this._permissions.map(p => p.toJSON())
        };
    }
}

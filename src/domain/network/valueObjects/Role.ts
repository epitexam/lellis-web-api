import { Permission } from "./Permission";
import { RoleError, RoleErrorType } from "../enums/RoleErrorType";

/**
 * @file Role.ts
 * @description
 * Defines the {@link Role} Value Object, representing a set of permissions
 * grouped under a common name (e.g. ADMIN, DOCTOR, NURSE).
 *
 * Roles serve as an abstraction for assigning permissions to users
 * within a given {@link Network}.
 *
 * This value object is **mutable** and supports:
 * - Adding/removing permissions
 * - Renaming the role
 * - Validation on change
 * - Checking permission inclusion
 *
 * @example
 * ```ts
 * const role = new Role("DOCTOR", [
 *   new Permission("READ", "PATIENT_FILE"),
 *   new Permission("WRITE", "PRESCRIPTION")
 * ]);
 * role.addPermission(new Permission("DELETE", "REPORT"));
 * console.log(role.hasPermission(new Permission("READ", "PATIENT_FILE"))); // true
 * ```
 */
export class Role {
    private _name: string;
    private _permissions: Permission[];

    /**
     * Creates a new {@link Role} instance.
     *
     * @param {string} name - The role’s name (e.g. ADMIN, DOCTOR, TECHNICIAN).
     * @param {Permission[]} [permissions=[]] - Optional initial permissions.
     *
     * @throws {RoleError} If the role name is empty or invalid.
     */
    constructor(name: string, permissions: Permission[] = []) {
        this._name = this.validateName(name);
        this._permissions = [...permissions]; // shallow copy
    }

    get name(): string {
        return this._name;
    }

    /**
     * Updates the name of the role.
     * @param {string} newName - The new name of the role.
     * @throws {RoleError} If the new name is empty or invalid.
     */
    set name(newName: string) {
        this._name = this.validateName(newName);
    }

    get permissions(): Permission[] {
        return [...this._permissions]; // immutable copy
    }

    /**
     * Validates the role name.
     * @param {string} name - The name to validate.
     * @returns {string} The validated name in uppercase.
     * @throws {RoleError} If the name is empty or invalid.
     */
    private validateName(name: string): string {
        if (!name) throw new RoleError(RoleErrorType.EMPTY_ROLE_NAME);
        const upper = name.toUpperCase().trim();
        if (!/^[A-Z_]+$/.test(upper)) {
            throw new RoleError(RoleErrorType.INVALID_ROLE_NAME_FORMAT);
        }
        return upper;
    }

    /**
     * Adds a permission to the role.
     * @param {Permission} permission - The permission to add.
     * @throws {RoleError} If the permission already exists.
     */
    addPermission(permission: Permission): void {
        if (this._permissions.some(p => p.equals(permission))) {
            throw new RoleError(RoleErrorType.DUPLICATE_PERMISSION);
        }
        this._permissions.push(permission);
    }

    /**
     * Removes a permission from the role.
     * @param {Permission} permission - The permission to remove.
     * @throws {RoleError} If the permission does not exist.
     */
    removePermission(permission: Permission): void {
        const before = this._permissions.length;
        this._permissions = this._permissions.filter(p => !p.equals(permission));
        if (this._permissions.length === before) {
            throw new RoleError(RoleErrorType.PERMISSION_NOT_FOUND);
        }
    }

    /**
     * Checks if the role has a specific permission.
     * @param {Permission} permission - The permission to verify.
     * @returns {boolean} True if the permission exists.
     */
    hasPermission(permission: Permission): boolean {
        return this._permissions.some(p => p.equals(permission));
    }

    /**
     * Replaces all permissions with a new set.
     * @param {Permission[]} permissions - The new permissions list.
     */
    replacePermissions(permissions: Permission[]): void {
        this._permissions = [...permissions];
    }

    /**
     * Serializes the role to JSON.
     * @returns {{ name: string, permissions: object[] }}
     */
    toJSON() {
        return {
            name: this._name,
            permissions: this._permissions.map(p => p.toJSON()),
        };
    }
}
import { PermissionError, PermissionErrorType } from "../enums/PermissionErrorType"; 

/**
 * @file Permission.ts
 * @description
 * Defines the {@link Permission} Value Object used to represent
 * an allowed action on a specific resource type.
 *
 * Each permission combines an `action` (e.g. READ, WRITE)
 * and a `resource` (e.g. PATIENT_FILE).
 * Used to express fine-grained access control within a domain network.
 *
 * This value object is **mutable** and supports:
 * - Renaming action/resource
 * - Validation on change
 * - Equality comparison
 *
 * @example
 * ```ts
 * const permission = new Permission("READ", "PATIENT_FILE");
 * permission.action = "WRITE"; // mutable
 * permission.resource = "REPORT";
 * console.log(permission.toJSON()); // { action: "WRITE", resource: "REPORT" }
 * ```
 */
export class Permission {
    private _action: string;
    private _resource: string;

    /**
     * Creates a new {@link Permission} instance.
     *
     * @param {string} action - The action this permission allows (READ, WRITE, DELETE).
     * @param {string} resource - The resource type this permission applies to.
     *
     * @throws {PermissionError} If the action or resource is empty or invalid.
     */
    constructor(action: string, resource: string) {
        this._action = this.validateAction(action);
        this._resource = this.validateResource(resource);
    }

    get action(): string {
        return this._action;
    }

    /**
     * Updates the action of the permission.
     *
     * @param {string} newAction - The new action (READ, WRITE, etc.).
     * @throws {PermissionError} If the new action is invalid.
     */
    set action(newAction: string) {
        this._action = this.validateAction(newAction);
    }

    get resource(): string {
        return this._resource;
    }

    /**
     * Updates the resource of the permission.
     *
     * @param {string} newResource - The new resource (PATIENT_FILE, REPORT, etc.).
     * @throws {PermissionError} If the new resource is invalid.
     */
    set resource(newResource: string) {
        this._resource = this.validateResource(newResource);
    }

    /**
     * Validates the action string.
     * @param {string} action - The action to validate.
     * @returns {string} The validated action in uppercase.
     * @throws {PermissionError} If the action is empty or invalid.
     */
    private validateAction(action: string): string {
        if (!action) throw new PermissionError(PermissionErrorType.EMPTY_ACTION);
        const upper = action.toUpperCase().trim();
        if (!/^[A-Z_]+$/.test(upper)) {
            throw new PermissionError(PermissionErrorType.INVALID_ACTION_FORMAT);
        }
        return upper;
    }

    /**
     * Validates the resource string.
     * @param {string} resource - The resource to validate.
     * @returns {string} The validated resource in uppercase.
     * @throws {PermissionError} If the resource is empty or invalid.
     */
    private validateResource(resource: string): string {
        if (!resource) throw new PermissionError(PermissionErrorType.EMPTY_RESOURCE);
        const upper = resource.toUpperCase().trim();
        if (!/^[A-Z_]+$/.test(upper)) {
            throw new PermissionError(PermissionErrorType.INVALID_RESOURCE_FORMAT);
        }
        return upper;
    }

    /**
     * Checks semantic equality with another permission.
     * @param {Permission} other - The permission to compare against.
     * @returns {boolean} True if both permissions match on action and resource.
     */
    equals(other: Permission): boolean {
        return (
            this._action === other._action &&
            this._resource === other._resource
        );
    }

    /**
     * Converts this permission to a serializable format.
     * @returns {{ action: string, resource: string }}
     */
    toJSON() {
        return {
            action: this._action,
            resource: this._resource,
        };
    }
}
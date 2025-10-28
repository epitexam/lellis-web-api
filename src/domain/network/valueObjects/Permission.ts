/**
 * Represents a permission defining an action on a resource type.
 * Mutable version for dynamic updates.
 */
export class Permission {
    private _action: string;
    private _resource: string;

    /**
     * Creates a new Permission instance.
     * @param {string} action - The action this permission allows (READ, WRITE, DELETE).
     * @param {string} resource - The resource type this permission applies to.
     */
    constructor(action: string, resource: string) {
        if (!action || !resource) throw new Error("Permission action and resource cannot be empty.");
        this._action = action.toUpperCase();
        this._resource = resource;
    }

    get action(): string {
        return this._action;
    }

    set action(newAction: string) {
        if (!newAction) throw new Error("Action cannot be empty.");
        this._action = newAction.toUpperCase();
    }

    get resource(): string {
        return this._resource;
    }

    set resource(newResource: string) {
        if (!newResource) throw new Error("Resource cannot be empty.");
        this._resource = newResource;
    }

    /**
     * Checks equality with another Permission.
     * @param {Permission} other
     * @returns {boolean}
     */
    equals(other: Permission): boolean {
        return this._action === other._action && this._resource === other._resource;
    }

    /**
     * Serialize to JSON
     * @returns {object}
     */
    toJSON() {
        return { action: this._action, resource: this._resource };
    }
}

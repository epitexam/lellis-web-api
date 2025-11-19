/**
 * @file WebPermission.ts
 * @description
 * Defines all possible permissions available in a typical web application.
 *
 * Each permission is composed of an action and a resource.
 * The format is: `{ACTION}_{RESOURCE}`.
 *
 * This enum is meant to be used for:
 * - Role creation and assignment
 * - Permission validation
 * - UI-level access control
 * - API-level authorization
 *
 * @example
 * ```ts
 * const permissions = [
 *   WebPermission.READ_USER,
 *   WebPermission.CREATE_NETWORK,
 *   WebPermission.DELETE_RESOURCE,
 * ];
 * ```
 */
export enum WebPermission {
    // ————————————————————————————————————————————————————————————————————————————————
    // USER MANAGEMENT
    // ————————————————————————————————————————————————————————————————————————————————
    /**
     * Allows reading user profiles (viewing details like name, email, etc.).
     * @resource User
     * @action READ
     */
    READ_USER = "READ_USER",

    /**
     * Allows creating new user accounts.
     * @resource User
     * @action CREATE
     */
    CREATE_USER = "CREATE_USER",

    /**
     * Allows updating user profiles (name, email, etc.).
     * @resource User
     * @action UPDATE
     */
    UPDATE_USER = "UPDATE_USER",

    /**
     * Allows deleting user accounts.
     * @resource User
     * @action DELETE
     */
    DELETE_USER = "DELETE_USER",

    /**
     * Allows viewing user authentication status (e.g., active, suspended).
     * @resource User
     * @action READ_AUTH_STATUS
     */
    READ_USER_AUTH_STATUS = "READ_USER_AUTH_STATUS",

    // ————————————————————————————————————————————————————————————————————————————————
    // NETWORK MANAGEMENT
    // ————————————————————————————————————————————————————————————————————————————————
    /**
     * Allows viewing network details.
     * @resource Network
     * @action READ
     */
    READ_NETWORK = "READ_NETWORK",

    /**
     * Allows creating new networks.
     * @resource Network
     * @action CREATE
     */
    CREATE_NETWORK = "CREATE_NETWORK",

    /**
     * Allows updating network details (name, settings, etc.).
     * @resource Network
     * @action UPDATE
     */
    UPDATE_NETWORK = "UPDATE_NETWORK",

    /**
     * Allows deleting a network.
     * @resource Network
     * @action DELETE
     */
    DELETE_NETWORK = "DELETE_NETWORK",

    // ————————————————————————————————————————————————————————————————————————————————
    // MEMBER MANAGEMENT (within a network)
    // ————————————————————————————————————————————————————————————————————————————————
    /**
     * Allows viewing network members.
     * @resource NetworkMember
     * @action READ
     */
    READ_NETWORK_MEMBER = "READ_NETWORK_MEMBER",

    /**
     * Allows adding a user to a network.
     * @resource NetworkMember
     * @action CREATE
     */
    CREATE_NETWORK_MEMBER = "CREATE_NETWORK_MEMBER",

    /**
     * Allows updating a member's role in a network.
     * @resource NetworkMember
     * @action UPDATE
     */
    UPDATE_NETWORK_MEMBER = "UPDATE_NETWORK_MEMBER",

    /**
     * Allows removing a user from a network.
     * @resource NetworkMember
     * @action DELETE
     */
    DELETE_NETWORK_MEMBER = "DELETE_NETWORK_MEMBER",

    // ————————————————————————————————————————————————————————————————————————————————
    // ROLE MANAGEMENT (within a network)
    // ————————————————————————————————————————————————————————————————————————————————
    /**
     * Allows viewing existing roles in a network.
     * @resource Role
     * @action READ
     */
    READ_ROLE = "READ_ROLE",

    /**
     * Allows creating new roles in a network.
     * @resource Role
     * @action CREATE
     */
    CREATE_ROLE = "CREATE_ROLE",

    /**
     * Allows updating an existing role's permissions.
     * @resource Role
     * @action UPDATE
     */
    UPDATE_ROLE = "UPDATE_ROLE",

    /**
     * Allows deleting a role from a network.
     * @resource Role
     * @action DELETE
     */
    DELETE_ROLE = "DELETE_ROLE",

    // ————————————————————————————————————————————————————————————————————————————————
    // RESOURCE MANAGEMENT (shared resources in a network)
    // ————————————————————————————————————————————————————————————————————————————————
    /**
     * Allows viewing shared resources in a network.
     * @resource Resource
     * @action READ
     */
    READ_RESOURCE = "READ_RESOURCE",

    /**
     * Allows uploading or creating a new shared resource.
     * @resource Resource
     * @action CREATE
     */
    CREATE_RESOURCE = "CREATE_RESOURCE",

    /**
     * Allows updating an existing shared resource.
     * @resource Resource
     * @action UPDATE
     */
    UPDATE_RESOURCE = "UPDATE_RESOURCE",

    /**
     * Allows deleting a shared resource.
     * @resource Resource
     * @action DELETE
     */
    DELETE_RESOURCE = "DELETE_RESOURCE",

    // ————————————————————————————————————————————————————————————————————————————————
    // ADMIN-SPECIFIC PERMISSIONS
    // ————————————————————————————————————————————————————————————————————————————————
    /**
     * Allows viewing all system logs (audit trails).
     * @resource SystemLog
     * @action READ
     */
    READ_SYSTEM_LOG = "READ_SYSTEM_LOG",

    /**
     * Allows viewing system-level settings.
     * @resource SystemSettings
     * @action READ
     */
    READ_SYSTEM_SETTINGS = "READ_SYSTEM_SETTINGS",

    /**
     * Allows updating system-level settings.
     * @resource SystemSettings
     * @action UPDATE
     */
    UPDATE_SYSTEM_SETTINGS = "UPDATE_SYSTEM_SETTINGS",

    /**
     * Allows managing billing or subscription plans.
     * @resource Billing
     * @action MANAGE
     */
    MANAGE_BILLING = "MANAGE_BILLING",

    // ————————————————————————————————————————————————————————————————————————————————
    // FILE / STORAGE MANAGEMENT
    // ————————————————————————————————————————————————————————————————————————————————
    /**
     * Allows uploading files to a network.
     * @resource File
     * @action UPLOAD
     */
    UPLOAD_FILE = "UPLOAD_FILE",

    /**
     * Allows downloading files from a network.
     * @resource File
     * @action DOWNLOAD
     */
    DOWNLOAD_FILE = "DOWNLOAD_FILE",

    /**
     * Allows viewing file metadata.
     * @resource File
     * @action READ
     */
    READ_FILE = "READ_FILE",

    /**
     * Allows deleting uploaded files.
     * @resource File
     * @action DELETE
     */
    DELETE_FILE = "DELETE_FILE",

    // ————————————————————————————————————————————————————————————————————————————————
    // NOTIFICATIONS
    // ————————————————————————————————————————————————————————————————————————————————
    /**
     * Allows sending notifications to users in a network.
     * @resource Notification
     * @action SEND
     */
    SEND_NOTIFICATION = "SEND_NOTIFICATION",

    /**
     * Allows viewing all notifications in a network.
     * @resource Notification
     * @action READ
     */
    READ_NOTIFICATION = "READ_NOTIFICATION",

    // ————————————————————————————————————————————————————————————————————————————————
    // API KEYS & INTEGRATIONS
    // ————————————————————————————————————————————————————————————————————————————————
    /**
     * Allows creating API keys for a network.
     * @resource ApiKey
     * @action CREATE
     */
    CREATE_API_KEY = "CREATE_API_KEY",

    /**
     * Allows viewing API keys for a network.
     * @resource ApiKey
     * @action READ
     */
    READ_API_KEY = "READ_API_KEY",

    /**
     * Allows updating API keys (e.g., regenerating).
     * @resource ApiKey
     * @action UPDATE
     */
    UPDATE_API_KEY = "UPDATE_API_KEY",

    /**
     * Allows deleting API keys.
     * @resource ApiKey
     * @action DELETE
     */
    DELETE_API_KEY = "DELETE_API_KEY",

    // ————————————————————————————————————————————————————————————————————————————————
    // DASHBOARD / UI ACCESS
    // ————————————————————————————————————————————————————————————————————————————————
    /**
     * Allows accessing the admin dashboard.
     * @resource Dashboard
     * @action ACCESS_ADMIN
     */
    ACCESS_ADMIN_DASHBOARD = "ACCESS_ADMIN_DASHBOARD",

    /**
     * Allows accessing the network dashboard.
     * @resource Dashboard
     * @action ACCESS_NETWORK
     */
    ACCESS_NETWORK_DASHBOARD = "ACCESS_NETWORK_DASHBOARD",
}
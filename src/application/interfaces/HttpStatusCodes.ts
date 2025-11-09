/**
 * @file HttpStatusCodes.ts
 * @description
 * A comprehensive, centralized enumeration of standardized HTTP status codes as defined by 
 * RFC 7231, RFC 6585, RFC 9110, and other relevant IETF specifications.
 * 
 * This enum serves to eliminate the use of magic numbers throughout the application by providing
 * named, semantically meaningful constants for every commonly used (and some less common) HTTP status.
 * It is intended for use in controllers, error handlers, domain services, and API clients to ensure
 * consistency, readability, and maintainability.
 * 
 * Status codes are grouped by their class (1xx–5xx) and include only official, standardized codes.
 * Obsolete, non-standard, or server-specific codes (e.g., 418 "I'm a teapot") are intentionally omitted
 * unless widely recognized and formally registered.
 */

export enum HttpStatusCodes {
    // ========================================================================
    // 1xx: Informational Responses
    // Indicate that the request was received and the process is continuing.
    // ========================================================================

    /**
     * 100 Continue
     * The server has received the request headers and the client should proceed to send the request body.
     */
    CONTINUE = 100,

    /**
     * 101 Switching Protocols
     * The requester has asked the server to switch protocols and the server has agreed to do so.
     */
    SWITCHING_PROTOCOLS = 101,

    /**
     * 102 Processing (WebDAV - RFC 2518)
     * The server has received and is processing the request, but no response is available yet.
     */
    PROCESSING = 102,

    /**
     * 103 Early Hints (RFC 8297)
     * Used to return some response headers before the final HTTP message.
     */
    EARLY_HINTS = 103,


    // ========================================================================
    // 2xx: Success
    // Indicate that the client's request was successfully received, understood, and accepted.
    // ========================================================================

    /**
     * 200 OK
     * The request succeeded. The meaning of the success varies depending on the HTTP method.
     */
    OK = 200,

    /**
     * 201 Created
     * The request succeeded, and a new resource was created as a result.
     */
    CREATED = 201,

    /**
     * 202 Accepted
     * The request has been accepted for processing, but the processing has not been completed.
     */
    ACCEPTED = 202,

    /**
     * 203 Non-Authoritative Information
     * The request was successful, but the meta-information returned may come from a third-party.
     */
    NON_AUTHORITATIVE_INFORMATION = 203,

    /**
     * 204 No Content
     * The server successfully processed the request and is not returning any content.
     */
    NO_CONTENT = 204,

    /**
     * 205 Reset Content
     * The server successfully processed the request and instructs the client to reset the document view.
     */
    RESET_CONTENT = 205,

    /**
     * 206 Partial Content
     * The server is delivering only part of the resource due to a range header sent by the client.
     */
    PARTIAL_CONTENT = 206,

    /**
     * 207 Multi-Status (WebDAV - RFC 4918)
     * Provides status for multiple independent operations (used in WebDAV).
     */
    MULTI_STATUS = 207,

    /**
     * 208 Already Reported (WebDAV - RFC 5842)
     * Used inside a DAV:propstat response element to avoid enumerating duplicate bindings.
     */
    ALREADY_REPORTED = 208,

    /**
     * 226 IM Used (RFC 3229)
     * The server has fulfilled a GET request for the resource, and the response is a representation
     * of the result of one or more instance-manipulations applied to the current instance.
     */
    IM_USED = 226,


    // ========================================================================
    // 3xx: Redirection
    // Indicate that further action must be taken by the client to fulfill the request.
    // ========================================================================

    /**
     * 300 Multiple Choices
     * The request has more than one possible response. The user or user agent should choose one.
     */
    MULTIPLE_CHOICES = 300,

    /**
     * 301 Moved Permanently
     * The URL of the requested resource has been permanently changed.
     */
    MOVED_PERMANENTLY = 301,

    /**
     * 302 Found (Previously "Moved Temporarily")
     * The resource is temporarily located under a different URL.
     */
    FOUND = 302,

    /**
     * 303 See Other
     * The response to the request can be found under another URI using a GET method.
     */
    SEE_OTHER = 303,

    /**
     * 304 Not Modified
     * The resource has not been modified since the last conditional request.
     */
    NOT_MODIFIED = 304,

    /**
     * 305 Use Proxy (Deprecated)
     * The requested resource must be accessed through the proxy given by the Location field.
     * Note: This status code is deprecated due to security concerns.
     */
    USE_PROXY = 305,

    /**
     * 307 Temporary Redirect
     * The server sends this response to direct the client to get the requested resource at another URI,
     * with the same method used in the original request.
     */
    TEMPORARY_REDIRECT = 307,

    /**
     * 308 Permanent Redirect
     * The request and all future requests should be repeated using another URI.
     */
    PERMANENT_REDIRECT = 308,


    // ========================================================================
    // 4xx: Client Errors
    // Indicate that the request contains bad syntax, cannot be fulfilled, or is unauthorized.
    // ========================================================================

    /**
     * 400 Bad Request
     * The server cannot process the request due to client error (e.g., malformed syntax).
     */
    BAD_REQUEST = 400,

    /**
     * 401 Unauthorized
     * Authentication is required and has failed or not yet been provided.
     */
    UNAUTHORIZED = 401,

    /**
     * 402 Payment Required (Reserved for future use)
     * Intended for digital payment systems, but not commonly used.
     */
    PAYMENT_REQUIRED = 402,

    /**
     * 403 Forbidden
     * The server understood the request but refuses to authorize it.
     */
    FORBIDDEN = 403,

    /**
     * 404 Not Found
     * The server cannot find the requested resource.
     */
    NOT_FOUND = 404,

    /**
     * 405 Method Not Allowed
     * The request method is known but not supported for the target resource.
     */
    METHOD_NOT_ALLOWED = 405,

    /**
     * 406 Not Acceptable
     * The server cannot produce a response matching the client's Accept headers.
     */
    NOT_ACCEPTABLE = 406,

    /**
     * 407 Proxy Authentication Required
     * The client must first authenticate with a proxy.
     */
    PROXY_AUTHENTICATION_REQUIRED = 407,

    /**
     * 408 Request Timeout
     * The server timed out waiting for the request.
     */
    REQUEST_TIMEOUT = 408,

    /**
     * 409 Conflict
     * The request conflicts with the current state of the server (e.g., duplicate creation).
     */
    CONFLICT = 409,

    /**
     * 410 Gone
     * The requested resource is no longer available and will not be available again.
     */
    GONE = 410,

    /**
     * 411 Length Required
     * The server requires a Content-Length header to be defined.
     */
    LENGTH_REQUIRED = 411,

    /**
     * 412 Precondition Failed
     * One or more conditions in the request header fields evaluated to false.
     */
    PRECONDITION_FAILED = 412,

    /**
     * 413 Payload Too Large
     * The request is larger than the server is willing or able to process.
     */
    PAYLOAD_TOO_LARGE = 413,

    /**
     * 414 URI Too Long
     * The URI requested is longer than the server can interpret.
     */
    URI_TOO_LONG = 414,

    /**
     * 415 Unsupported Media Type
     * The media format of the requested data is not supported by the server.
     */
    UNSUPPORTED_MEDIA_TYPE = 415,

    /**
     * 416 Range Not Satisfiable
     * The range specified by the Range header cannot be fulfilled.
     */
    RANGE_NOT_SATISFIABLE = 416,

    /**
     * 417 Expectation Failed
     * The expectation indicated by the Expect request-header field cannot be met.
     */
    EXPECTATION_FAILED = 417,

    /**
     * 421 Misdirected Request (RFC 7540)
     * The request was directed at a server that is not able to produce a response.
     */
    MISDIRECTED_REQUEST = 421,

    /**
     * 422 Unprocessable Entity (WebDAV - RFC 4918)
     * The server understands the content type and syntax, but cannot process the contained instructions.
     */
    UNPROCESSABLE_ENTITY = 422,

    /**
     * 423 Locked (WebDAV - RFC 4918)
     * The source or destination resource is locked.
     */
    LOCKED = 423,

    /**
     * 424 Failed Dependency (WebDAV - RFC 4918)
     * The request failed because it depended on another request that failed.
     */
    FAILED_DEPENDENCY = 424,

    /**
     * 425 Too Early (RFC 8470)
     * Indicates that the server is unwilling to risk processing a request that might be replayed.
     */
    TOO_EARLY = 425,

    /**
     * 426 Upgrade Required
     * The server refuses to perform the request using the current protocol.
     */
    UPGRADE_REQUIRED = 426,

    /**
     * 428 Precondition Required (RFC 6585)
     * The origin server requires the request to be conditional to prevent the "lost update" problem.
     */
    PRECONDITION_REQUIRED = 428,

    /**
     * 429 Too Many Requests (RFC 6585)
     * The user has sent too many requests in a given amount of time ("rate limiting").
     */
    TOO_MANY_REQUESTS = 429,

    /**
     * 431 Request Header Fields Too Large (RFC 6585)
     * The server is unwilling to process the request because its header fields are too large.
     */
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,

    /**
     * 451 Unavailable For Legal Reasons (RFC 7725)
     * The server is denying access to the resource due to legal demands.
     */
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,


    // ========================================================================
    // 5xx: Server Errors
    // Indicate that the server failed to fulfill a valid request.
    // ========================================================================

    /**
     * 500 Internal Server Error
     * The server encountered an unexpected condition that prevented it from fulfilling the request.
     */
    INTERNAL_SERVER_ERROR = 500,

    /**
     * 501 Not Implemented
     * The server does not support the functionality required to fulfill the request.
     */
    NOT_IMPLEMENTED = 501,

    /**
     * 502 Bad Gateway
     * The server, while acting as a gateway or proxy, received an invalid response from an upstream server.
     */
    BAD_GATEWAY = 502,

    /**
     * 503 Service Unavailable
     * The server is currently unable to handle the request due to temporary overloading or maintenance.
     */
    SERVICE_UNAVAILABLE = 503,

    /**
     * 504 Gateway Timeout
     * The server, while acting as a gateway, did not receive a timely response from an upstream server.
     */
    GATEWAY_TIMEOUT = 504,

    /**
     * 505 HTTP Version Not Supported
     * The server does not support the HTTP protocol version used in the request.
     */
    HTTP_VERSION_NOT_SUPPORTED = 505,

    /**
     * 506 Variant Also Negotiates (RFC 2295)
     * Transparent content negotiation for the request results in a circular reference.
     */
    VARIANT_ALSO_NEGOTIATES = 506,

    /**
     * 507 Insufficient Storage (WebDAV - RFC 4918)
     * The server cannot store the representation needed to complete the request.
     */
    INSUFFICIENT_STORAGE = 507,

    /**
     * 508 Loop Detected (WebDAV - RFC 5842)
     * The server detected an infinite loop while processing the request.
     */
    LOOP_DETECTED = 508,

    /**
     * 510 Not Extended (RFC 2774)
     * Further extensions to the request are required for the server to fulfill it.
     */
    NOT_EXTENDED = 510,

    /**
     * 511 Network Authentication Required (RFC 6585)
     * The client needs to authenticate to gain network access (used in captive portals).
     */
    NETWORK_AUTHENTICATION_REQUIRED = 511,
}
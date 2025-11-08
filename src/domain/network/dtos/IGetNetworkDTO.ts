/**
 * DTO representing the input filters for getting one network by its id
 */
export interface IGetNetworkDTO {
    /**
     * The unique identifier of the network involved in the request.
     * @example "a1b2c3d4-e5f6-7890-1234-567890abcdef"
     */
    networkId: string;

}
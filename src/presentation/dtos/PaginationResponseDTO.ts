export interface PaginationResponseDTO<T> {
    data: T[]
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}

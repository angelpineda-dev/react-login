export interface CategoryResponse {
    status: boolean;
    data: Datum[];
    pagination: Pagination;
}

export interface Datum {
    name: string;
    user: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    id: string;
}

export interface Pagination {
    total: number;
    itemsPerPage: number;
    page: number;
    totalPages: number;
}

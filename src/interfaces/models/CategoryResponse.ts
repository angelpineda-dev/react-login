export interface CategoryResponse {
    status: boolean;
    data: Data;
}

export interface Data {
    categories: Category[];
    pagination: Pagination;
}

export interface Category {
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

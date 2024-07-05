export interface ProductResponse {
    status: boolean;
    data: Data;
}

export interface Data {
    products: Product[];
    pagination: Pagination;
}

export interface Pagination {
    total: number;
    itemsPerPage: number;
    page: number;
    totalPages: number;
}

export interface Product {
    name: string;
    category: Category;
    price: number;
    description: string;
    stock: number;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    id: string;
}

export interface Category {
    _id: string;
    name: string;
    id: string;
}

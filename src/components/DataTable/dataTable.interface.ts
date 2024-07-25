export interface IDataTable<T> {
    data: T[];
    columns: IDataColumn<T>[];
    controls: IControls;
    title?: string;
    options?: IDataOptions;
    headerActions?: JSX.Element;
}

export interface IDataColumn<T> {
    title: string;
    column: string | ((data:T) => JSX.Element);
}

export interface IDataOptions {
    search?: boolean;
}


export interface IControls {
    query: IQuery;
    pagination: IPagination;
}

export interface IQuery {
    limit: number;
    page: number;
    search?: string;
    sort?: object;
}

export interface IPagination {
    totalItems: number;
    totalPages: number;
}

export interface IResponse<T> {
    status: boolean;
    data?: T[],
    controls: IControls;
}
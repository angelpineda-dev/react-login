import { useEffect, useState } from 'react'
import { IControls, IPagination, IQuery, IResponse } from '../components/DataTable/dataTable.interface';

const PAGINATION: IPagination = {
    totalItems: 0,
    totalPages: 0
}

const QUERY: IQuery = {
    limit: 10,
    page: 1,
}

export interface PromiseResponse<T> {
    status: boolean;
    data?: T[];
    pagination?: IPagination;
}

function useDataTable<T>({ service }) {
    const [data, setData] = useState<T[]>([]);
    const [controls, setControls] = useState<IControls>({
        query: QUERY,
        pagination: PAGINATION
    })
    
    useEffect(() => {
        getAll();
    }, [service])

    /**
     * getAll
     * fetchs all items with pagination for a data table
     * sets pagination elements for data table
     */
    function getAll(): Promise<void | IResponse<T>> {
        return service
            .then((response: IResponse<T>) => {
                setData(response?.data);
                setControls( response?.controls );
        })
    }

    return {
        data,
        controls
    }
}

export default useDataTable;

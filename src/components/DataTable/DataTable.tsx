import { useEffect, useState } from 'react'

import requestData from '../../helpers/request';    
import useDebounce from '../../hooks/useDebounce';
import { IDataTable } from './dataTable.interface';

const DataTable = <T extends {id: string}> ({ 
    data = [],
    columns,
    controls,
    title = '',
    headerActions,
    options = {
        search:true
    } 
}:IDataTable<T>) => {
    const [tableData, setTableData] = useState(data)
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState({})
    const debounceText = useDebounce(search, 300, fetchData);
    const [query, setQuery] = useState({
        limit: 10,
        page: 1
    })
    const [pagination, setPagination] = useState({...controls?.pagination})

    useEffect(() => {
        //fetchData();
    }, [query])

    /**
     * fetchData
     * Fetchs data from service
     */
    function fetchData() {
        requestData({
            endpoint: `/category?limit=${query.limit}&page=${query.page}&search=${search}&sort=${sort}`
        }).then(response => {
            
            if (response?.status) {
                setTableData(response?.data);
                setPagination(response?.pagination)
            } else {
                console.error('error')
            }
        })
    }

    /**
     * handleSearch
     * handle input change event to update search
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        let text = e.target.value;

        setSearch(text)
    }

  return (
    <section className='w-full p-2 border'>
        <h2 className='text-2xl mb-2'>{title}</h2>

        <div className='table__controls flex flex-col'>
            <div className='flex justify-between'>
                  {
                      options?.search && <input
                          type="text"
                          name="search"
                          placeholder='Search...'
                          value={search}
                          onChange={(e) => handleSearch(e)}
                      />
                  }
                  <div className='table__actions'>
                      {headerActions}
                  </div>
            </div>
            <div className='flex justify-between items-center gap-2 py-2'>

                <div className='control'>
                      <label className='control-label'>Limit:</label>
                      <input
                          type='number'
                          name='limit'
                          value={query?.limit}
                          onChange={(e) => setQuery({ ...query, limit: Number(e.target.value) })}
                          className='control-input w-20 text-center'
                          />
                </div>
                <p>Total: {pagination.totalItems}</p>
            </div>
        </div>

        <table className='w-full'>
            <thead>
                  <tr>
                      {
                        columns?.map((col, idx) => <th key={`th-${idx}`}>{col?.title}</th>)
                      }
                  </tr>
            </thead>
            <tbody>
                {
                      tableData.map((row) => (
                        <tr className='text-center' key={row?.id}>
                            {
                                columns?.map(col => {
                                    let content;

                                    switch (typeof col?.column) {
                                        case 'string':
                                            content = row?.[col?.column]
                                            break;

                                        case 'function':
                                            content = col?.column(row);
                                            break;
                                    
                                        default:
                                            'Setup behavior for this data type'
                                            break;
                                    }

                                    return <td key={`td-${col?.title}-${row?.id}`}>{content}</td>
                                })
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>

        <section>
            {/* TODO: pagination */}
        </section>
    </section>
  )
}

export default DataTable
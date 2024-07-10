import { useEffect, useState } from 'react'

import requestData from '../../helpers/request';    
import useDebounce from '../../hooks/useDebounce';

const DataTable = ({ service, title = '' }) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState({})
    const debounceText = useDebounce(search, 300, fetchData);
    const [pagination, setPagination] = useState({
        limit: 10,
        page: 1,
        total: 0,
        totalPages: 1
    })

    useEffect(() => {
        fetchData();
    }, [service])

    function fetchData() {
        requestData({
            endpoint: `/${service}?limit=${pagination.limit}&page=${pagination.page}&search=${search}&sort=${sort}`
        }).then(response => {
            if (response?.status) {
                setData(response?.data);
                setPagination(response?.pagination)
            } else {
                console.error('error')
            }
        })
    }

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        let text = e.target.value;

        setSearch(text)
    }

  return (
    <section className='w-full p-2 border'>
        <h2 className='text-2xl mb-2'>{title}</h2>

        <div className='table__controls flex flex-col'>
            <div className='flex justify-between'>
                  <input 
                    type="text" 
                    name="search" 
                    placeholder='Search...' 
                    value={search}
                    onChange={(e) => handleSearch(e)}
                    />
                  <div className='table__actions'>
                    <button>Add</button>
                  </div>
            </div>
            <div >
                <p>Results: {pagination.total}</p>
            </div>
        </div>

        <table className='w-full'>
            <thead>
                  <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Actions</th>
                  </tr>
            </thead>
            <tbody>
                {
                    data.map(category => (
                        <tr className='text-center' key={category?.id}>
                            <td>{category?.name}</td>
                            <td>{category?.description}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </section>
  )
}

export default DataTable
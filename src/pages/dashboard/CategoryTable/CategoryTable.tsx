import React, { useEffect } from 'react'
import requestData from '../../../helpers/request'
import DataTable from '../../../components/DataTable/DataTable'
import { IDataColumn } from '../../../components/DataTable/dataTable.interface'
import { useModalContext } from '../../../components/context/Modals/ModalProvider'
import CategoryForm from './CategoryForm'
import { Category } from '../../../interfaces/models'
import useDataTable from '../../../hooks/useDataTable'
import { categoryService } from '../../../services/Categories.service'

const CategoryTable = () => {
    const { showModal } = useModalContext();
    const { data, controls } = useDataTable<Category>({service: categoryService.getAll })

    const categoryColumns: IDataColumn<Category>[] = [
        { title: 'Name', column: 'name' },
        { title: 'Description', column: 'description' },
        {
            title: 'Actions', column: (data:Category) => {
                return <>
                    <button 
                        onClick={() => handleCategoryForm(data)} 
                        className='p-1 m-1 rounded-md bg-slate-200 text-black'>
                            Editar
                    </button>
                    <button
                        onClick={()=> deleteCategory(data)}
                        className='p-1 m-1 rounded-md bg-slate-200 text-black'>
                            Eliminar
                    </button>
                </>
            }
        },
    ]

    function handleCategoryForm(data?:Category) {

        showModal({
            element: <CategoryForm onSubmit={!data?.id ? addCategory : editCategory} data={data} />,
            title: 'Categories'
        })
    }

    function addCategory(data) {
        requestData({
            method: 'post',
            endpoint: `/category`,
            data
        }).then(res => console.log(res))
    }

    function editCategory(data:Category) {

        requestData({
            method: 'put',
            endpoint: `/category/${data?.id}`,
            data
        }).then(res => console.log(res))
    }

    function deleteCategory(data:Category) {

        let isDelete = confirm(`Delete category ${data?.name}`);

        if (isDelete) {
            requestData({
                method: 'delete',
                endpoint: `/category/${data?.id}`,
                data
            }).then(res => console.log(res))
        }

        
    }

  return (
      <DataTable<Category>
          data={data}
          controls={controls}
          title="Categorias"
          columns={categoryColumns}
          headerActions={<>
              <button onClick={() => handleCategoryForm()} className='p-2 rounded-md bg-slate-800 text-white'>
                  Add
              </button>
          </>}
      />
  )
}

export default CategoryTable
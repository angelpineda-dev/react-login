import { useEffect, useState } from "react"
import requestData from "../../helpers/request";
import DataTable from "../../components/DataTable/DataTable";

const Dashboard = () => {
    const [Categories, setCategories] = useState({});

    useEffect(() => {
      requestData({
        endpoint: '/category'
      })
    }, [])

  return (
    <>
        <h1 className="text-3xl text-center">Dashboard</h1>

        <DataTable 
            service='category'
            title="Categorias"
        />

        {/**
         ** DataTable
         * Tabla
         * Titulo
         * Barra busqueda
         * Campos dinamicos
         * Controles (limit, page)
         * Servicio
         * - limit => select
         * - page => buttons
         * - paginacion
        */}
    </>
  )
}

export default Dashboard
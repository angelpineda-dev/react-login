/* React */
import { createContext, useContext, useEffect, useState } from "react"
/* Libraries */
import toast, { Toaster } from "react-hot-toast";
import requestData from "../../../helpers/request";
import { CategoryResponse } from "../../../interfaces/models";
import { Category } from "../../../interfaces/models/CategoryResponse";

interface IGlobalContext {
    toast: any;
    getCategories: () => Category[];
}

const GlobalContext = createContext({} as IGlobalContext)

export const GlobalProvider = ({children}) => {
    const [categories, setCategories] = useState<Category[]>([]);

    function getCategories():Category[] {
        return categories;
    }

    /**
     * getCategories
     * fetch categories
     */
    function fetchCategories() {
        requestData({
            endpoint: '/category'
        }).then((res: CategoryResponse) => {
            setCategories(res.data.categories)
        })
    }

    useEffect(() => {
      fetchCategories()
    }, [])
    

  return (
    <GlobalContext.Provider value={{ 
        toast, 
        getCategories
        }}>
        {children}
        <Toaster/>
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => useContext(GlobalContext)
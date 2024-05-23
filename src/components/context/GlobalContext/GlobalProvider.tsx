/* React */
import { createContext, useContext } from "react"
/* Libraries */
import toast, { Toaster } from "react-hot-toast";

interface IGlobalContext {
    toast: any;
}

const GlobalContext = createContext({} as IGlobalContext)

export const GlobalProvider = ({children}) => {
  return (
    <GlobalContext.Provider value={{toast}}>
        {children}
        <Toaster/>
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => useContext(GlobalContext)
import { Outlet } from "react-router"
import Navbar from "./components/ui/Navbar"
import { useAuth } from "./components/context/Auth/AuthProvider"

function App() {

    const { isAdmin } = useAuth();

  return (
    <>
        <Navbar >
            <Outlet/>
        </Navbar> 

        
    </>    
  )
}

export default App

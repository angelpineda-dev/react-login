import React from 'react'
import { useAuth } from '../../components/context/Auth/AuthProvider'

const Home = () => {
    const auth = useAuth()
  return (
    <div>
        <nav>
            <button onClick={auth.logout}>Logout</button>
        </nav>
          <h1>Home</h1>
    </div>
  )
}

export default Home
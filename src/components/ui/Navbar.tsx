
import { Link } from "react-router-dom"

import { useGlobal } from "../context/GlobalContext/GlobalProvider"

const Navbar = () => {
    const { getCategories } = useGlobal();

  return (
      <nav className='flex justify-between p-2 bg-orange-800'>
          <Link to="/" className="text-white">Logo</Link>
          <ul className='flex justify-around  w-[50%]'>
            {
                 
                getCategories().map( (category) =>
                (<li key={category.id}>
                    <Link
                        to={`/category/${category.name.toLowerCase()}`}
                        state={{
                            category: category
                        }}
                        className="text-white"
                        > {category.name}
                    </Link>
                </li>))
            }
              
          </ul>

          <div className='flex gap-2'>
              <Link to="/login" className="px-2 rounded text-white">Login</Link>
              <button className="px-2 rounded">Cart</button>
          </div>
      </nav>
  )
}

export default Navbar
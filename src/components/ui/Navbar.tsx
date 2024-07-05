import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import requestData from "../../helpers/request"
import { CategoryResponse } from "../../interfaces/models"

const Navbar = () => {
    const [categories, setCategories] = useState<CategoryResponse>({} as CategoryResponse)

    /**
     * getCategories
     * fetch categories
     */
    function getCategories() {
        requestData({
            endpoint: '/category'
        }).then(res => setCategories(res))
    }

    useEffect(() => {
        getCategories()
    }, [])
    

  return (
      <nav className='flex justify-between p-2 bg-orange-800'>
          <Link to="/" className="text-white">Logo</Link>
          <ul className='flex justify-around  w-[50%]'>
            {
                categories?.data?.categories.map( (category) => 
                (<li key={category.id}>
                    <Link
                        to={`/category/${category.name}`}
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
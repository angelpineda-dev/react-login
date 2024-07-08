import { useState, useEffect } from 'react';
import requestData from '../../helpers/request';
import { Product, ProductResponse } from '../../interfaces/models/ProductResponse';
import Navbar from '../../components/ui/Navbar';
import { useAuth } from '../../components/context/Auth/AuthProvider';
import AdminNavbar from '../../components/ui/AdminNavbar/AdminNavbar';


const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { getUser } = useAuth()

    function fetchProducts() {
        requestData({
            endpoint: '/product',
        }).then((res: ProductResponse) => {
            setProducts(res.data.products)
        })
    }

    useEffect(() => {
        //fetchProducts()
    }, [])

    return (
        <>
            {
                getUser()?.rol !== 'ADMIN_ROLE' ?  <Navbar />  : <AdminNavbar/>
            }

            <div>
                <h1 className='text-center text-2xl mt-4'>Principales products</h1>

                <br />
                <ul className='grid grid-cols-3 gap-2 p-2'>
                    {
                        products.map(product => <li key={product.id} className='border border-gray-300 p-2 rounded' >
                            <div className='flex justify-between'>
                                <h4>{product.name}</h4>
                                <small>${product.price}</small>
                            </div>

                            <small>Categoria: {product?.category?.name}</small>

                            <img src={product.image} alt={product.description} className='h-[350px] w-full rounded my-2' />

                            <div className='flex justify-end'>
                                <button className='p-2 rounded-md bg-blue-800 text-white mt-2 self-end'>Comprar</button>
                            </div>
                        </li>)
                    }
                </ul>
            </div>
        </>
    )
}

export default Home
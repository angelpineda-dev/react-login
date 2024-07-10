import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

import Navbar from '../../components/ui/Navbar'
import Card from '../../components/ui/Card/Card';

import requestData from '../../helpers/request';

import { Product, ProductResponse } from '../../interfaces/models/ProductResponse';

const Products = () => {
    let { state } = useLocation();
    const [productResponse, setProductResponse] = useState({} as ProductResponse)

    /**
     * getProductsByCategory
     * fetch data depending on category id
     */
    function getProductsByCategory() {
        requestData({
            endpoint: `/product/${state?.category.id}`
        }).then(res => {
            setProductResponse(res);
            //console.log(res)
        })
    }

    /**
     * drawProducts
     * generate cards of product list
     * @param {Product[]} [products=[]]
     * @return {JSX.Element[]} 
     */
    function drawProducts(products: Product[] = []): JSX.Element[] {

        let $products = products.map(product =>
            <li
                key={product.id}
                className='border border-gray-300 p-2 rounded'
            >
                <Card product={product} />
            </li>)

        return $products;
    }

    useEffect(() => {
        getProductsByCategory()
    }, [state])

    return (
        <>
            <h1>{state.category?.name}</h1>

            <ul className='grid grid-cols-3 gap-2 p-2'>
                {drawProducts(productResponse?.data)}
            </ul>
        </>
    )
}

export default Products
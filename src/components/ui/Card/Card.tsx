import { Product } from "../../../interfaces/models/ProductResponse"

interface Props {
    product: Product;
}

const Card = ({ product }: Props): JSX.Element => {

    return (
        <>
            <div className='flex justify-between mb-4'>
                <h4>{product.name}</h4>
                <small>${product.price}</small>
            </div>

            <div className="flex">
                <img src={product.image} alt={product.description} className='max-h-[250px] max-w-[250px] mr-2' style={{borderRadius: '12px'}} />

                <div className="space-y-4">
                    <p>{product.description}</p>
                    <small className="inline-block">Categoria: {product?.category?.name}</small>
                </div>
            </div>

            <div className='flex justify-end'>
                <button className='p-2 rounded-md bg-blue-800 text-white mt-2 self-end'>Comprar</button>
            </div>
        </>
    )
}

export default Card
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);

    const getProduct = async () => {
        const response = await axios.get('http://localhost:3001/products')
            .then(response => {
                return response;
            })
            .catch(error => {
                console.log(error);
            });
        return response.data.data;
    };

    useEffect(() => {
        getProduct().then(data => {
            setProducts(data);
        });
    }, []);


    return (
        <div className="container mx-auto p-4">

            <div className="relative overflow-x-auto bg-neutral-50 shadow-xs rounded-base ">
                <div className='py-3'>
                    <a href="/add_product" className='text-white text-sm font-medium bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded my-2'>
                        Add Product
                    </a>
                </div>

                <table className="w-full text-sm text-left text-body mt-1">
                    <thead className="text-sm text-body bg-neutral-200 border-b border-default-medium">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-medium">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Expired Date
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => {
                            return (
                                <tr key={`product-${product.product_id}`} className="bg-neutral-50 border-b border-default hover:bg-neutral-200">
                                    <td scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                        {product.product_id}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.product_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.expire_date ? new Date(product.expire_date).toLocaleDateString('en-GB') : ''}
                                        {/* {new Date(product.expire_date).toString('yyyy-MM-dd')} */}
                                        {/* {console.log(product.expire_date)} */}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        <Link to={`/edit_product/${product.product_id}`} type="button" className="text-black bg-yellow-400 hover:bg-yellow-600 py-2 px-4 rounded mx-1 my-1">
                                            Edit
                                        </Link>
                                        <button type="button" className="text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded mx-1 my-1 ">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default ProductList;
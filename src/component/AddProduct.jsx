import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3001/products', {
                product_name: productName,
                price: price
            }).then(response => {
                console.log(response);
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container mx-auto p-4'>
            <div className="relative overflow-x-auto ">
                <form onSubmit={saveProduct}>
                    <div className='mb-6'>
                        <label htmlFor="product_name" className='block mb-2.5 text-sm font-medium text-heading'>Product Name</label>
                        <input
                            type="text"
                            id='product_name'
                            name='product_name'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            placeholder="Product Name"
                            value={productName}
                            onChange={(e) => { setProductName(e.target.value) }}
                            required />
                    </div>

                    <div className='mb-6'>
                        <label htmlFor="price" className='block mb-2.5 text-sm font-medium text-heading'>Price</label>
                        <input
                            type="number"
                            id='price'
                            name='price'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            placeholder="Price"
                            value={price}
                            onChange={(e) => { setPrice(e.target.value) }}
                            required />
                    </div>

                    <button type='submit' className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
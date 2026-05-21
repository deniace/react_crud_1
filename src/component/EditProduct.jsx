import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';



function EditProduct() {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [expiredDate, setExpiredDate] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const updateProduct = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3001/products/${id}`, {
                product_name: productName,
                price: price,
                expire_date: expiredDate
            }).then(response => {
                console.log(response);
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const getProductById = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/products/${id}`)
                .then(response => {
                    return response.data.data
                })
                .catch(error => {
                    console.log(error);
                });

            return response;
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getProductById().then(
            data => {
                setProductName(data.product_name);
                setPrice(data.price);
                setExpiredDate(data.expired_date);
                // setType(data.types);
            }
        );;
    }, []);

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>Edit Product</h1>
            <div className="relative overflow-x-auto ">
                <form onSubmit={updateProduct}>
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

                    <div className='mb-6'>
                        <label htmlFor="expired_date" className='block mb-2.5 text-sm font-medium text-heading'>Expired Date</label>
                        <input
                            type="date"
                            id='expired_date'
                            name='expired_date'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            placeholder="expired date"
                            value={expiredDate}
                            onChange={(e) => {
                                console.log(e.target.value);
                                setExpiredDate(e.target.value)
                            }}
                            required />
                    </div>

                    <div className='mb-6'>
                        <label htmlFor="types" className='block mb-2.5 text-sm font-medium text-heading'>Types</label>
                        <select
                            name="types"
                            id="types"
                            value={type}
                            onChange={(e) => { setType(e.target.value) }}
                            className='block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 '
                        >
                            <option value="">Select a type</option>
                            <option value="1">Type 1</option>
                            <option value="2">Type 2</option>
                            <option value="3">Type 3</option>
                        </select>
                    </div>

                    <button type='submit' className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditProduct
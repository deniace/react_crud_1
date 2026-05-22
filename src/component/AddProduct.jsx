import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState("");
    const navigate = useNavigate();
    const [merk, setMerk] = useState([]);

    const saveProduct = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3001/products', {
                product_name: productName,
                price: price,
                type: type,
            }).then(response => {
                console.log(response);
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const getMerk = async () => {
        try {
            const response = await axios.get('http://localhost:3001/merks')
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
        getMerk()
            .then(data => {
                setMerk(data);
                console.log(data);
            });
    }, []);

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

                    <div className='mb-6'>
                        <label htmlFor="expired_date" className='block mb-2.5 text-sm font-medium text-heading'>Expired Date</label>
                        <input
                            type="date"
                            id='expired_date'
                            name='expired_date'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            placeholder="expired date"
                            value={date}
                            onChange={(e) => { setDate(e.target.value) }}
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
                            {merk.map((item) => {
                                return <option key={`merk-${item.id}`} value={item.id}>{item.merk_name}</option>
                            })}
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

export default AddProduct
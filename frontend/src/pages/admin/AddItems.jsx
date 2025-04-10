import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { BACKEND_URL } from '../../../utils/util';

function AddItems() {
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Men');
    const [subCategory, setSubCategory] = useState('Topwear');
    const [price, setPrice] = useState('');
    const [sizes, setSizes] = useState([]);
    const [bestseller, setBestseller] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSizeChange = (e) => {
        const value = e.target.value;
        setSizes(prev =>
            prev.includes(value)
                ? prev.filter(s => s !== value)
                : [...prev, value]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!image) {
            toast.error("Please upload an image");
            setLoading(false);
            return;
        }

        const token = localStorage.getItem("adminToken");

        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('subCategory', subCategory);
        formData.append('price', price);
        sizes.forEach(size => formData.append('sizes[]', size));
        formData.append('bestseller', bestseller);

        try {
            const res = await axios.post(`${BACKEND_URL}/product/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success('Product added!');
            console.log(res.data);

            setImage(null);
            setName('');
            setDescription('');
            setCategory('');
            setSubCategory('');
            setPrice('');
            setSizes([]);
            setBestseller(false);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to add product');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full max-w-5xl  px-4 sm:px-6 '>
            <div className='flex flex-col gap-2'>
                <label className='text-gray-500 font-medium'>Upload Image</label>
                <input
                    type='file'
                    accept='image/*'
                    id='image-upload'
                    onChange={(e) => setImage(e.target.files[0])}
                    className='hidden'
                />
                <label htmlFor='image-upload' className='cursor-pointer w-fit'>
                    <img
                        src={image ? URL.createObjectURL(image) : 'upload.png'}
                        alt='Upload'
                        className='w-24 h-24 object-cover rounded-md'
                    />
                </label>
                {image && (
                    <p className='text-sm text-gray-600 mt-1'>{image.name}</p>
                )}
            </div>

            <div className='flex flex-col gap-2'>
                <label className='text-gray-500 font-medium'>Product name</label>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Type here'
                    className='border border-gray-300 p-2 rounded-sm outline-[#c586a5] font-medium w-full'
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label className='text-gray-500 font-medium'>Product description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Write content here'
                    className='border border-gray-300 p-2 rounded-sm outline-[#c586a5] font-medium w-full'
                />
            </div>

            <div className='flex flex-col md:flex-row md:items-end gap-4'>
                <div className='flex flex-col gap-2 w-full md:w-1/3'>
                    <label className='text-gray-500 font-medium'>Product category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className='border border-gray-400 p-2 rounded-sm'
                    >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>

                <div className='flex flex-col gap-2 w-full md:w-1/3'>
                    <label className='text-gray-500 font-medium'>Sub category</label>
                    <select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className='border border-gray-400 p-2 rounded-sm'
                    >
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Footwear">Footwear</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>

                <div className='flex flex-col gap-2 w-full md:w-1/3'>
                    <label className='text-gray-500 font-medium'>Product Price</label>
                    <input
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder='25'
                        className='border border-gray-400 p-2 rounded-sm w-full'
                    />
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <label className='text-gray-500 font-medium'>Product Sizes</label>
                <div className='flex gap-4 flex-wrap'>
                    {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                        <label key={size} className='flex items-center gap-2'>
                            <input
                                type='checkbox'
                                value={size}
                                checked={sizes.includes(size)}
                                onChange={handleSizeChange}
                            />
                            {size}
                        </label>
                    ))}
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <label htmlFor='bestseller' className='text-gray-500 font-medium flex items-center gap-2'>
                    <input
                        id='bestseller'
                        type='checkbox'
                        checked={bestseller}
                        onChange={(e) => setBestseller(e.target.checked)}
                    />
                    Add to Bestseller
                </label>
            </div>

            <button
                type='submit'
                className='py-2 px-6 cursor-pointer bg-black text-white font-medium mt-4 disabled:opacity-50 w-fit'
                disabled={loading}
            >
                {loading ? 'Adding...' : 'Add Product'}
            </button>
        </form>
    );
}

export default AddItems;

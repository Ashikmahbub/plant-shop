import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaWeightHanging, FaTag, FaBoxOpen, FaImage, FaAlignLeft } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL;

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('indoor');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !weight || !price || !description || !image) {
      setErrors({
        title:       !title       ? 'Title is required' : '',
        weight:      !weight      ? 'Weight is required' : '',
        price:       !price       ? 'Price is required' : '',
        description: !description ? 'Description is required' : '',
        image:       !image       ? 'Product image is required' : '',
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('weight', weight);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);

    try {
      await axios.post(`${API_URL}/admin/products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Product added successfully!');
      setTitle('');
      setCategory('indoor');
      setWeight('');
      setPrice('');
      setDescription('');
      setImage(null);
      setErrors({});
      document.getElementById('image-input').value = null;

    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit}>

        {/* Title */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Product Title</label>
          <div className="relative">
            <FaTag className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`input input-bordered w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.title ? 'border-red-500' : ''}`}
              placeholder="Enter product title"
            />
          </div>
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <div className="relative">
            <FaAlignLeft className="absolute left-3 top-3 text-gray-400" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`textarea textarea-bordered w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Enter product description"
              rows={4}
            />
          </div>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Category */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Category</label>
          <div className="relative">
            <FaBoxOpen className="absolute left-3 top-3 text-gray-400" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="indoor">Indoor</option>
              <option value="semi-indoor">Semi-Indoor</option>
              <option value="office-friendly">Office-Friendly</option>
              <option value="bonsai">Bonsai</option>
              <option value="outdoor">Outdoor</option>
              <option value="succulents">Succulents</option>
              <option value="herbs">Herbs</option>
            </select>
          </div>
        </div>

        {/* Weight */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Weight (grams)</label>
          <div className="relative">
            <FaWeightHanging className="absolute left-3 top-3 text-gray-400" />
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className={`input input-bordered w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.weight ? 'border-red-500' : ''}`}
              placeholder="Enter weight in grams"
            />
          </div>
          {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
        </div>

        {/* Price BDT */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Price (৳ BDT)</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400 text-lg">৳</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`input input-bordered w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.price ? 'border-red-500' : ''}`}
              placeholder="Enter price in BDT"
            />
          </div>
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        {/* Image */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Product Image</label>
          <div className="relative">
            <FaImage className="absolute left-3 top-3 text-gray-400" />
            <input
              id="image-input"
              type="file"
              onChange={handleImageChange}
              className={`file-input file-input-bordered w-full py-2 focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.image ? 'border-red-500' : ''}`}
              accept="image/*"
            />
          </div>
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>

        <button
          type="submit"
          className="btn bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md w-full text-lg font-semibold transition-all duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
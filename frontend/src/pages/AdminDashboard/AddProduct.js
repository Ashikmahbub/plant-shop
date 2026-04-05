import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaWeightHanging, FaDollarSign, FaTag, FaBoxOpen, FaImage } from 'react-icons/fa';  // Import icons from FontAwesome

const API_URL = 'https://plants-shop-server-rho.vercel.app/api';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Indoor'); // Default to "Indoor"
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});  // State to handle validation errors

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Get the uploaded file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!title || !weight || !price || !image) {
      setErrors({
        title: !title ? 'Title is required' : '',
        weight: !weight ? 'Weight is required' : '',
        price: !price ? 'Price is required' : '',
        image: !image ? 'Product image is required' : '',
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('weight', weight);
    formData.append('price', price);
    formData.append('image', image); // Append the image file

    try {
      const response = await axios.post(`${API_URL}/admin/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Show success toast
      toast.success('Product added successfully!');

      // Reset form fields
      setTitle('');
      setCategory('Indoor');
      setWeight('');
      setPrice('');
      setImage(null);
      setErrors({});  // Clear errors
      document.getElementById("image-input").value = null; // Reset file input

    } catch (error) {
      // Show error toast
      toast.error('Failed to add product');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <ToastContainer /> {/* Toast Container for displaying notifications */}
      <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Product Title */}
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
              required
            />
          </div>
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
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
          <label className="block text-gray-700 font-semibold mb-2">Weight (in grams)</label>
          <div className="relative">
            <FaWeightHanging className="absolute left-3 top-3 text-gray-400" />
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className={`input input-bordered w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.weight ? 'border-red-500' : ''}`}
              placeholder="Enter weight in grams"
              required
            />
          </div>
          {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
        </div>

        {/* Price */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Price (in USD)</label>
          <div className="relative">
            <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`input input-bordered w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.price ? 'border-red-500' : ''}`}
              placeholder="Enter price"
              required
            />
          </div>
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        {/* Product Image */}
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
              required
            />
          </div>
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>

        {/* Submit Button */}
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

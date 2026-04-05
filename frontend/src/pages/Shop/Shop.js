import React, { useState, useEffect } from 'react';
import { getProducts } from '../../api';  
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Shop = () => {
  const { addToCart} = useCart(); 
 
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState('priceAsc');

  useEffect(() => {
    // Fetch products when the component loads
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        
        // Extract categories from the products
        const allCategories = [...new Set(data.map(product => product.category))];
        setCategories(allCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Sort and filter products when sortOption or selectedCategories changes
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        let filteredProducts = data;

        if (selectedCategories.length > 0) {
          filteredProducts = data.filter(product => selectedCategories.includes(product.category));
        }

        if (sortOption === 'priceAsc') {
          filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'priceDesc') {
          filteredProducts.sort((a, b) => b.price - a.price);
        }

        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [selectedCategories, sortOption]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Shop Our Plants</h2>

      {/* Category Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        {['Indoor', 'Semi-indoor', 'Bonsai', 'Office Friendly', 'Flower', 'Outdoor', 'Fruits'].map((category) => (
          <Link to={`/${category.toLowerCase().replace(/ /g, '-')}`} key={category}>
            <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition duration-300">
              {category}
            </button>
          </Link>
        ))}
      </div>

      {/* Filters and Sorting */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded"
          >
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>

          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <label key={category} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={category}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedCategories((prev) =>
                      e.target.checked ? [...prev, value] : prev.filter((c) => c !== value)
                    );
                  }}
                  className="form-checkbox"
                />
                <span className="ml-2">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <input
          type="text"
          placeholder="Search plants..."
          className="border border-green-700 px-3 py-2 rounded w-full md:w-1/3"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
          >
            <img
              src={`https://plants-shop-server-rho.vercel.app/${product.imageUrl}`}
              alt={product.name}
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-green-800">{product.title}</h3>
              <p className="text-gray-700 mt-2">${product.price}</p>
            <button
               onClick={() => {
                addToCart(product);
                toast.success(`${product.title} has been added to the cart!`, {
                  position: "top-right",
                  autoClose: 3000, // Automatically close after 3 seconds
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }}
              
               
    
               
               className="bg-green-700 text-white px-4 py-2 rounded mt-4 hover:bg-green-800 transition duration-300">
                Add to Cart
                
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Shop;

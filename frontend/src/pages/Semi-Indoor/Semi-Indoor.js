import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const API_URL = 'https://plants-shop-server-rho.vercel.app/api/';
const IMG_URL = 'http://localhost:5000';

const SemiIndoorPlants = () => {
  const { addToCart} = useCart(); 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(`${API_URL}products/semi-indoor`);
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch indoor plants');
      }
    };

    fetchPlants();
  }, []);

  
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Semi Indoor Plants</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={`${IMG_URL}${product.imageUrl}`}
              alt={product.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-2">Weight: {product.weight} grams</p>
              <p className="text-gray-600 mb-4">Price: ${product.price}</p>
              <button
               onClick={() => {
                addToCart(product);
                toast.success(`${product.title} has been added to the cart!`, {
                  position: "top-right",
                  autoClose: 2000, // Automatically close after 3 seconds
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

export default SemiIndoorPlants;

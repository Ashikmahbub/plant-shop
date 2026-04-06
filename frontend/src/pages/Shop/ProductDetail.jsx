import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProductById } from '../../services/api';

const IMG_URL = process.env.REACT_APP_IMG_URL;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch(() => toast.error('Failed to load product'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700" />
    </div>
  );

  if (!product) return (
    <div className="text-center py-20">
      <p className="text-gray-500 text-xl">Product not found.</p>
      <button onClick={() => navigate('/shop')} className="mt-4 text-green-700 underline">
        Back to Shop
      </button>
    </div>
  );

  const imageUrl = product.imageUrl?.startsWith('http')
    ? product.imageUrl
    : `${IMG_URL}${product.imageUrl}`;

  return (
    <div className="container mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="text-green-700 hover:underline mb-6 inline-block"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-[500px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <span className="text-sm text-green-600 uppercase font-semibold tracking-wide mb-2">
            {product.category}
          </span>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.title}</h1>
          <p className="text-3xl font-bold text-green-700 mb-4">৳ {product.price}</p>

          {product.weight && (
            <p className="text-gray-500 mb-4">Weight: {product.weight} grams</p>
          )}

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description || 'No description available.'}
          </p>

          <button
            onClick={() => {
              addToCart(product);
              toast.success(`${product.title} added to cart!`, {
                position: 'top-right',
                autoClose: 2000,
              });
            }}
            className="bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-800 transition duration-300 w-full md:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
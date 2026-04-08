import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProducts } from "../../services/api";
import Banner from "../../components/ui/Banner";
import Indoor from "../Categories/Indoors";
import SemiIndoor from "../Categories/SemiIndoors";
import Flower from "../Categories/Flower";
import Bonsai from "../Categories/Bonsai";
import Outdoor from "../Categories/Outdoor";

const IMG_URL = process.env.REACT_APP_IMG_URL;

const CategorySection = ({ category, children }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/shop?category=${category}`)}
      className="cursor-pointer hover:opacity-90 transition duration-200 px-4 mt-10"
    >
      {children}
    </div>
  );
};

// Reusable modern product card
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative overflow-hidden">
        <img
          onClick={() => navigate(`/product/${product._id}`)}
          src={
            product.imageUrl?.startsWith("http")
              ? product.imageUrl
              : `${IMG_URL}${product.imageUrl}`
          }
          alt={product.title}
          className="w-full h-40 md:h-52 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
        />
        {product.category && (
          <span className="absolute top-2 left-2 bg-green-700 text-white text-xs px-2 py-0.5 rounded-full font-medium capitalize">
            {product.category}
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3
          onClick={() => navigate(`/product/${product._id}`)}
          className="text-sm font-semibold text-gray-800 cursor-pointer hover:text-green-700 transition truncate"
        >
          {product.title}
        </h3>
        <p className="text-green-700 font-bold text-sm mt-1">৳ {product.price}</p>
        <button
          onClick={() => {
            addToCart(product);
            toast.success(`${product.title} added to cart!`, {
              position: "top-right",
              autoClose: 2000,
            });
          }}
          className="mt-auto pt-3"
        >
          <span className="block w-full bg-green-700 hover:bg-green-800 text-white text-xs font-semibold py-2 rounded-xl transition duration-300">
            + Add to Cart
          </span>
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getProducts().then((data) => setFeatured(data.slice(0, 4)));
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <ToastContainer />

      {/* Banner */}
      <Banner />

      {/* Shop Now Button */}
      <div className="text-center mt-6 px-4">
        <button
          onClick={() => navigate("/shop")}
          className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded-xl text-base md:text-lg font-semibold hover:bg-green-700 transition shadow-md"
        >
          Shop Now
        </button>
      </div>

      {/* Featured Products */}
      <div className="px-4 lg:px-12 mt-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs text-green-600 font-semibold uppercase tracking-widest">
              Hand-picked for you
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mt-0.5">Featured Plants</h2>
          </div>
          <button
            onClick={() => navigate("/shop")}
            className="text-sm text-green-700 border border-green-700 px-3 py-1.5 rounded-xl hover:bg-green-700 hover:text-white transition"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* Category Sections */}
      <CategorySection category="indoor">
        <Indoor />
      </CategorySection>
      <CategorySection category="semi-indoor">
        <SemiIndoor />
      </CategorySection>
      <CategorySection category="flower">
        <Flower />
      </CategorySection>
      <CategorySection category="bonsai">
        <Bonsai />
      </CategorySection>
      <CategorySection category="outdoor">
        <Outdoor />
      </CategorySection>

      <div className="mb-10" />
    </div>
  );
};

export default Home;
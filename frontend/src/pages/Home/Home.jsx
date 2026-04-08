import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import { getProducts } from "../../services/api";
import Banner from "../../components/ui/Banner";
import Indoor from "../Categories/Indoors";
import SemiIndoor from "../Categories/SemiIndoors";
import Flower from "../Categories/Flower";
import Bonsai from "../Categories/Bonsai";
import Outdoor from "../Categories/Outdoor";
import Packages from "../Categories/Packages";

const IMG_URL = process.env.REACT_APP_IMG_URL;

const CategorySection = ({ to, children }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(to)}
      className="cursor-pointer hover:opacity-90 transition duration-200 px-4 mt-8"
    >
      {children}
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getProducts().then((data) => setFeatured(data.slice(0, 4)));
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <ToastContainer />

      {/* Banner */}
      <Banner />

      {/* Shop Button */}
      <div className="text-center mt-6 px-4">
        <button
          onClick={() => navigate("/shop")}
          className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-green-700 transition"
        >
          Shop Now
        </button>
      </div>

      {/* Featured Products */}
      <div className="px-4 lg:px-12 mt-10">
        <h2 className="text-2xl font-bold text-green-700 mb-6">Featured Plants</h2>
        {/* ← 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((product) => (
            <div
              key={product._id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            >
              <img
                onClick={() => navigate(`/product/${product._id}`)}
                src={
                  product.imageUrl?.startsWith("http")
                    ? product.imageUrl
                    : `${IMG_URL}${product.imageUrl}`
                }
                alt={product.title}
                className="w-full h-40 md:h-56 object-cover cursor-pointer hover:opacity-90 transition"
              />
              <div className="p-3">
                <h3
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="text-sm md:text-base font-semibold text-green-800 cursor-pointer hover:underline truncate"
                >
                  {product.title}
                </h3>
                <p className="text-gray-700 text-sm mt-1">৳ {product.price}</p>
                <button
                  onClick={() => {
                    addToCart(product);
                    toast.success(`${product.title} added to cart!`, {
                      position: "top-right",
                      autoClose: 2000,
                    });
                  }}
                  className="bg-green-700 text-white px-3 py-1.5 rounded mt-3 hover:bg-green-800 transition w-full text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Sections */}
      <CategorySection to="/shop?category=indoor">
        <Indoor />
      </CategorySection>
      <CategorySection to="/shop?category=semi-indoor">
        <SemiIndoor />
      </CategorySection>
      <CategorySection to="/shop?category=flower">
        <Flower />
      </CategorySection>
      <CategorySection to="/shop?category=bonsai">
        <Bonsai />
      </CategorySection>
      <CategorySection to="/shop?category=outdoor">
        <Outdoor />
      </CategorySection>
      <CategorySection to="/shop?category=packages">
        <Packages />
      </CategorySection>
    </div>
  );
};

export default Home;
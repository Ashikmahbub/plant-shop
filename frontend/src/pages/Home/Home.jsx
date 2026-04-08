// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../../context/CartContext";
// import { toast, ToastContainer } from "react-toastify";
// import { getProducts } from "../../services/api";
// import Banner from "../../components/ui/Banner";
// import Indoor from "../Categories/Indoors";
// import SemiIndoor from "../Categories/SemiIndoors";
// import Flower from "../Categories/Flower";
// import Bonsai from "../Categories/Bonsai";
// import Outdoor from "../Categories/Outdoor";
// import Packages from "../Categories/Packages";

// const IMG_URL = process.env.REACT_APP_IMG_URL;

// const CategorySection = ({ to, children }) => {
//   const navigate = useNavigate();
//   return (
//     <div
//       onClick={() => navigate(to)}
//       className="cursor-pointer hover:opacity-90 transition duration-200 px-4 mt-8"
//     >
//       {children}
//     </div>
//   );
// };

// const Home = () => {
//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const [featured, setFeatured] = useState([]);

//   useEffect(() => {
//     getProducts().then((data) => setFeatured(data.slice(0, 4)));
//   }, []);

//   return (
//     <div className="w-full overflow-hidden">
//       <ToastContainer />

//       {/* Banner */}
//       <Banner />

//       {/* Shop Button */}
//       <div className="text-center mt-6 px-4">
//         <button
//           onClick={() => navigate("/shop")}
//           className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-green-700 transition"
//         >
//           Shop Now
//         </button>
//       </div>

//       {/* Featured Products */}
//       <div className="px-4 lg:px-12 mt-10">
//         <h2 className="text-2xl font-bold text-green-700 mb-6">Featured Plants</h2>
//         {/* ← 2 cols on mobile, 4 on desktop */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {featured.map((product) => (
//             <div
//               key={product._id}
//               className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
//             >
//               <img
//                 onClick={() => navigate(`/product/${product._id}`)}
//                 src={
//                   product.imageUrl?.startsWith("http")
//                     ? product.imageUrl
//                     : `${IMG_URL}${product.imageUrl}`
//                 }
//                 alt={product.title}
//                 className="w-full h-40 md:h-56 object-cover cursor-pointer hover:opacity-90 transition"
//               />
//               <div className="p-3">
//                 <h3
//                   onClick={() => navigate(`/product/${product._id}`)}
//                   className="text-sm md:text-base font-semibold text-green-800 cursor-pointer hover:underline truncate"
//                 >
//                   {product.title}
//                 </h3>
//                 <p className="text-gray-700 text-sm mt-1">৳ {product.price}</p>
//                 <button
//                   onClick={() => {
//                     addToCart(product);
//                     toast.success(`${product.title} added to cart!`, {
//                       position: "top-right",
//                       autoClose: 2000,
//                     });
//                   }}
//                   className="bg-green-700 text-white px-3 py-1.5 rounded mt-3 hover:bg-green-800 transition w-full text-sm"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Category Sections */}
//       <CategorySection to="/shop?category=indoor">
//         <Indoor />
//       </CategorySection>
//       <CategorySection to="/shop?category=semi-indoor">
//         <SemiIndoor />
//       </CategorySection>
//       <CategorySection to="/shop?category=flower">
//         <Flower />
//       </CategorySection>
//       <CategorySection to="/shop?category=bonsai">
//         <Bonsai />
//       </CategorySection>
//       <CategorySection to="/shop?category=outdoor">
//         <Outdoor />
//       </CategorySection>
//       <CategorySection to="/shop?category=packages">
//         <Packages />
//       </CategorySection>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProducts } from "../../services/api";
import Banner from "../../components/ui/Banner";

const IMG_URL = process.env.REACT_APP_IMG_URL;

// Reusable category section with real DB products
const CategorySection = ({ category, title, subtitle }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      const filtered = data
        .filter((p) => p.category?.toLowerCase() === category.toLowerCase())
        .slice(0, 6);
      setProducts(filtered);
    });
  }, [category]);

  if (products.length === 0) return null;

  return (
    <section className="px-4 lg:px-12 mt-10">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-green-600 font-medium">{subtitle}</p>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        <button
          onClick={() => navigate(`/shop?category=${category}`)}
          className="text-sm text-green-700 underline hover:text-green-900"
        >
          View All
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <img
              onClick={() => navigate(`/product/${product._id}`)}
              src={
                product.imageUrl?.startsWith("http")
                  ? product.imageUrl
                  : `${IMG_URL}${product.imageUrl}`
              }
              alt={product.title}
              className="w-full h-40 object-cover cursor-pointer hover:opacity-90 transition"
            />
            <div className="p-2">
              <h3
                onClick={() => navigate(`/product/${product._id}`)}
                className="text-xs md:text-sm font-semibold text-green-800 cursor-pointer hover:underline truncate"
              >
                {product.title}
              </h3>
              <p className="text-gray-600 text-xs mt-1">৳ {product.price}</p>
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success(`${product.title} added to cart!`, {
                    position: "top-right",
                    autoClose: 2000,
                  });
                }}
                className="bg-green-700 text-white w-full py-1.5 rounded mt-2 hover:bg-green-800 transition text-xs font-medium"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
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

      {/* Shop Now Button */}
      <div className="text-center mt-6 px-4">
        <button
          onClick={() => navigate("/shop")}
          className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-green-700 transition"
        >
          Shop Now
        </button>
      </div>

      {/* Featured Products */}
      <div className="px-4 lg:px-12 mt-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-green-600 font-medium">Hand-picked for you</p>
            <h2 className="text-2xl font-bold text-gray-800">Featured Plants</h2>
          </div>
          <button
            onClick={() => navigate("/shop")}
            className="text-sm text-green-700 underline hover:text-green-900"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((product) => (
            <div
              key={product._id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                onClick={() => navigate(`/product/${product._id}`)}
                src={
                  product.imageUrl?.startsWith("http")
                    ? product.imageUrl
                    : `${IMG_URL}${product.imageUrl}`
                }
                alt={product.title}
                className="w-full h-40 md:h-52 object-cover cursor-pointer hover:opacity-90 transition"
              />
              <div className="p-3">
                <h3
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="text-sm font-semibold text-green-800 cursor-pointer hover:underline truncate"
                >
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">৳ {product.price}</p>
                <button
                  onClick={() => {
                    addToCart(product);
                    toast.success(`${product.title} added to cart!`, {
                      position: "top-right",
                      autoClose: 2000,
                    });
                  }}
                  className="bg-green-700 text-white w-full py-1.5 rounded mt-3 hover:bg-green-800 transition text-sm font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Sections — real DB products */}
      <CategorySection category="indoor"      title="Plants For Indoors"   subtitle="Make Your Home a Green Haven" />
      <CategorySection category="semi-indoor" title="Semi-Indoor Plants"   subtitle="Perfect for Any Space" />
      <CategorySection category="bonsai"      title="Bonsai Collection"    subtitle="Art of Miniature Trees" />
      <CategorySection category="flower"      title="Flowering Plants"     subtitle="Brighten Your Space" />
      <CategorySection category="outdoor"     title="Outdoor Plants"       subtitle="For Your Garden" />

      {/* bottom padding */}
      <div className="mb-10" />
    </div>
  );
};

export default Home;
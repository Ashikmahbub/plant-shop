import React, { useState, useEffect, useMemo } from "react";
import { getProducts } from "../../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IMG_URL = process.env.REACT_APP_IMG_URL;

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);

  const params = new URLSearchParams(location.search);
  const urlSearch = params.get("search") || "";
  const urlCategory = params.get("category") || "";

  const [searchQuery, setSearchQuery] = useState(urlSearch);

  useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const normalized = data.map((p) => ({
          ...p,
          category: p.category?.toLowerCase().trim(),
        }));
        setAllProducts(normalized);
        const allCategories = [
          ...new Set(normalized.map((p) => p.category).filter(Boolean)),
        ];
        setCategories(allCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (urlCategory && categories.length > 0) {
      const match = categories.find((c) => c === urlCategory.toLowerCase());
      if (match) setSelectedCategories([match]);
    } else if (!urlCategory) {
      setSelectedCategories([]);
    }
  }, [urlCategory, categories]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q)
      );
    }
    if (sortOption === "priceAsc") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOption === "priceDesc") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }
    return result;
  }, [allProducts, selectedCategories, sortOption, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Shop Our Plants</h2>

      {/* Category Pills */}
      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategories((prev) =>
                prev.includes(category)
                  ? prev.filter((c) => c !== category)
                  : [...prev, category]
              )
            }
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
              selectedCategories.includes(category)
                ? "bg-green-700 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700"
            }`}
          >
            {category}
          </button>
        ))}
        {selectedCategories.length > 0 && (
          <button
            onClick={() => setSelectedCategories([])}
            className="px-4 py-1.5 rounded-full text-sm font-medium border border-red-400 text-red-400 hover:bg-red-50 transition"
          >
            Clear ✕
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-3 items-center">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-200 px-4 py-2 rounded-xl text-sm focus:outline-none focus:border-green-700"
        >
          <option value="default">Default</option>
          <option value="priceAsc">Price: Low → High</option>
          <option value="priceDesc">Price: High → Low</option>
        </select>

        <input
          type="text"
          placeholder="Search plants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-200 px-4 py-2 rounded-xl text-sm w-full md:w-72 focus:outline-none focus:border-green-700"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-12 w-12 border-b-2 border-green-700 rounded-full" />
        </div>
      )}

      {/* Empty */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No products found.</p>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                onClick={() => navigate(`/product/${product._id}`)}
                src={
                  product.imageUrl?.startsWith("http")
                    ? product.imageUrl
                    : `${IMG_URL}${product.imageUrl}`
                }
                alt={product.title}
                className="w-full h-48 md:h-60 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              />
              {product.category && (
                <span className="absolute top-2 left-2 bg-green-700 text-white text-xs px-2 py-0.5 rounded-full font-medium capitalize">
                  {product.category}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="p-3 flex flex-col flex-1">
              <h3
                onClick={() => navigate(`/product/${product._id}`)}
                className="text-sm font-semibold text-gray-800 cursor-pointer hover:text-green-700 transition truncate"
              >
                {product.title}
              </h3>
              {product.sku && (
                <p className="text-xs text-gray-400 mt-0.5">SKU: {product.sku}</p>
              )}
              <p className="text-green-700 font-bold text-sm mt-1">
                ৳ {product.price}
              </p>
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success(`${product.title} added to cart!`, {
                    position: "top-right",
                    autoClose: 2000,
                  });
                }}
                className="mt-auto pt-3 w-full bg-green-700 hover:bg-green-800 text-white text-xs font-semibold py-2 rounded-xl transition duration-300"
              >
                + Add to Cart
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
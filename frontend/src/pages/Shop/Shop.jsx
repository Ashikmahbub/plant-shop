import React, { useState, useEffect, useMemo } from "react";
import { getProducts } from "../../services/api";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

  // ✅ Get search query from URL (Navbar search)
  const params = new URLSearchParams(location.search);
  const urlSearch = params.get("search") || "";

  // ✅ Local search (input field)
  const [searchQuery, setSearchQuery] = useState(urlSearch);

  useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setAllProducts(data);

        const allCategories = [
          ...new Set(data.map((p) => p.category).filter(Boolean)),
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

  // ✅ FILTER + SEARCH + SORT (FIXED)
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes(p.category?.toLowerCase())
      );
    }

    // Search filter (NAME + SKU)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();

      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortOption === "priceAsc") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOption === "priceDesc") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [allProducts, selectedCategories, sortOption, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">
        Shop Our Plants
      </h2>

      {/* Category Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategories((prev) =>
                prev.includes(category.toLowerCase())
                  ? prev.filter((c) => c !== category.toLowerCase())
                  : [...prev, category.toLowerCase()]
              )
            }
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border px-3 py-2 rounded"
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
          className="border border-green-700 px-3 py-2 rounded w-full md:w-1/3"
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
          <p className="text-gray-500 text-xl">No products found.</p>
        </div>
      )}

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <img
              onClick={() => navigate(`/product/${product._id}`)}
              src={
                product.imageUrl?.startsWith("http")
                  ? product.imageUrl
                  : `${IMG_URL}${product.imageUrl}`
              }
              alt={product.title}
              className="w-full h-80 object-cover cursor-pointer"
            />

            <div className="p-4">
              <h3
                onClick={() => navigate(`/product/${product._id}`)}
                className="text-lg font-semibold text-green-800 cursor-pointer"
              >
                {product.title}
              </h3>

              {/* ✅ SKU visible */}
              {product.sku && (
                <p className="text-xs text-gray-400">SKU: {product.sku}</p>
              )}

              <p className="text-gray-700 mt-2">৳ {product.price}</p>

              <button
                onClick={() => {
                  addToCart(product);
                  toast.success(`${product.title} added to cart`);
                }}
                className="bg-green-700 text-white px-4 py-2 rounded mt-4 w-full"
              >
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
import React, { useState, useEffect, useMemo } from "react";
import { getProducts } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IMG_URL = process.env.REACT_APP_IMG_URL;

const Shop = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        console.log("Fetched products:", data); // remove after confirming
        setAllProducts(data);
        const allCategories = [...new Set(data.map((p) => p.category).filter(Boolean))];
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

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes(p.category?.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      result = result.filter((p) =>
        p.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === "priceAsc") {
      result.sort((a, b) => Number(a.price) - Number(b.price)); // ← cast to number
    } else if (sortOption === "priceDesc") {
      result.sort((a, b) => Number(b.price) - Number(a.price)); // ← cast to number
    }

    return result;
  }, [allProducts, selectedCategories, sortOption, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Shop Our Plants</h2>

      {/* Category Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        {["Indoor", "Semi-indoor", "Bonsai", "Office Friendly", "Flower", "Outdoor", "Fruits"].map((category) => (
          <Link to={`/${category.toLowerCase().replace(/ /g, "-")}`} key={category}>
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
            <option value="default">Default</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>

          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <label key={category} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={category.toLowerCase()}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedCategories((prev) =>
                      e.target.checked
                        ? [...prev, value]
                        : prev.filter((c) => c !== value)
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-green-700 px-3 py-2 rounded w-full md:w-1/3"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700" />
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">No products found.</p>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
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
              className="w-full h-80 object-cover cursor-pointer hover:opacity-90 transition"
            />
            <div className="p-4">
              <h3
                onClick={() => navigate(`/product/${product._id}`)}
                className="text-lg font-semibold text-green-800 cursor-pointer hover:underline"
              >
                {product.title}
              </h3>
              <p className="text-gray-700 mt-2">৳ {product.price}</p>
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success(`${product.title} has been added to the cart!`, {
                    position: "top-right",
                    autoClose: 3000,
                  });
                }}
                className="bg-green-700 text-white px-4 py-2 rounded mt-4 hover:bg-green-800 transition duration-300 w-full"
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
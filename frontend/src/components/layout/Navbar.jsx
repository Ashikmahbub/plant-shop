import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

const CATEGORIES = [
  { label: "Indoor",        path: "/indoor" },
  { label: "Semi-Indoor",   path: "/semi-indoor" },
  { label: "Bonsai",        path: "/bonsai" },
  { label: "Outdoor",       path: "/outdoor" },
  { label: "Flower",        path: "/flower" },
  { label: "Office Friendly", path: "/office-friendly" },
  { label: "Fruits",        path: "/fruits" },
];

const ADMIN_EMAILS = ['admin@plantshop.bd'];

const Navbar = () => {
  const { cart } = useCart();
  const { user, userSignOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((t, i) => t + i.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [search, setSearch] = useState("");

  const isAdmin = user && ADMIN_EMAILS.includes(user.email);

  const handleSearchSubmit = () => {
    if (!search.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(search)}`);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="w-full px-4 py-3 flex items-center justify-between gap-3">

        {/* LEFT — hamburger + logo */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-green-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
          <Link to="/" className="text-xl font-bold text-green-700 whitespace-nowrap">
            🌿 PlantShop
          </Link>
        </div>

        {/* CENTER — desktop nav links + categories */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-green-700">
          <Link to="/" className="hover:text-green-900">Home</Link>
          <Link to="/shop" className="hover:text-green-900">Shop</Link>

          {/* Categories Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCategoryOpen(true)}
            onMouseLeave={() => setIsCategoryOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-green-900">
              Categories <FaChevronDown size={12} />
            </button>
            {isCategoryOpen && (
              <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg py-2 w-48 border border-gray-100 z-50">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.path}
                    to={cat.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                    onClick={() => setIsCategoryOpen(false)}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/contact" className="hover:text-green-900">Contact</Link>
        </div>

        {/* SEARCH (desktop) */}
        <div className="hidden md:flex w-64 relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
            className="border border-green-700 px-4 py-1.5 rounded-l w-full text-sm focus:outline-none"
            placeholder="Search plants..."
          />
          <button
            onClick={handleSearchSubmit}
            className="px-3 bg-green-700 text-white rounded-r hover:bg-green-800"
          >
            <FaSearch size={14} />
          </button>
        </div>

        {/* RIGHT — cart + admin + profile */}
        <div className="flex items-center gap-3">
          {isAdmin && (
            <button
              onClick={() => navigate("/admin")}
              className="hidden md:block bg-green-700 text-white px-3 py-1.5 rounded text-sm hover:bg-green-800"
            >
              Dashboard
            </button>
          )}

          {/* Cart */}
          <div onClick={() => navigate("/cart")} className="relative cursor-pointer text-green-700">
            <FaShoppingCart size={22} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </div>

          {/* Profile / Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/profile" className="flex items-center gap-2 hover:opacity-80">
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=166534&color=fff`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden md:block text-green-700 font-medium text-sm">
                  {user.displayName || user.email}
                </span>
              </Link>
              <button
                onClick={userSignOut}
                className="bg-green-700 text-white px-2 py-1 rounded text-sm hover:bg-green-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-green-700 text-white px-3 py-1.5 rounded text-sm hover:bg-green-800">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4 space-y-3">
          {/* Search */}
          <div className="flex mt-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
              className="border w-full px-3 py-2 text-sm"
              placeholder="Search plants..."
            />
            <button onClick={handleSearchSubmit} className="bg-green-700 text-white px-4">
              <FaSearch />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-1 text-sm font-medium text-gray-700">
            <Link to="/" className="py-2 border-b" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/shop" className="py-2 border-b" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>

            {/* Categories in mobile */}
            <div>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full flex justify-between items-center py-2 border-b text-left"
              >
                Categories <FaChevronDown size={12} className={`transition ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCategoryOpen && (
                <div className="pl-4 flex flex-col space-y-1 py-2 bg-gray-50">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.path}
                      to={cat.path}
                      className="py-1.5 text-green-700 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/contact" className="py-2 border-b" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>

            {user && (
              <Link to="/profile" className="py-2 border-b text-green-700" onClick={() => setIsMobileMenuOpen(false)}>
                Profile
              </Link>
            )}

            {isAdmin && (
              <button
                onClick={() => { navigate("/admin"); setIsMobileMenuOpen(false); }}
                className="py-2 text-left text-green-700 font-semibold"
              >
                Dashboard
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
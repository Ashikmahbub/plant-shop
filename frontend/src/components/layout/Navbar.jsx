import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { cart } = useCart();
  const { user, userSignOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((t, i) => t + i.quantity, 0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  // ✅ ADMIN CHECK
  const isAdmin = user?.email === "admin@email.com"; // replace this

  const handleSearchSubmit = () => {
    if (!search.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(search)}`);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="w-full px-4 py-3 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-green-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FaBars size={22} />
          </button>

          <Link to="/" className="text-xl font-bold text-green-700">
            🌿 PlantShop
          </Link>
        </div>

        {/* SEARCH (DESKTOP) */}
        <div className="hidden md:flex md:w-1/3 relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
            className="border border-green-700 px-4 py-2 rounded-l w-full"
            placeholder="Search..."
          />
          <button
            onClick={handleSearchSubmit}
            className="absolute right-0 top-0 bottom-0 px-4 bg-green-700 text-white"
          >
            <FaSearch />
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* DASHBOARD BUTTON */}
          {isAdmin && (
            <button
              onClick={() => navigate("/admin")}
              className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800 transition text-sm"
            >
              Dashboard
            </button>
          )}

          {/* CART */}
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer text-green-700"
          >
            <FaShoppingCart size={22} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </div>

          {/* PROFILE / AUTH */}
          {user ? (
            <div className="flex items-center space-x-2">

              {/* PROFILE */}
              <Link
                to="/profile"
                className="flex items-center space-x-2 hover:opacity-80"
              >
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=166534&color=fff`
                  }
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden md:block text-green-700 font-medium text-sm">
                  {user.displayName || user.email}
                </span>
              </Link>

              {/* LOGOUT */}
              <button
                onClick={userSignOut}
                className="bg-green-700 text-white px-2 py-1 rounded text-sm"
              >
                Logout
              </button>

            </div>
          ) : (
            <Link to="/login" className="text-green-700 font-medium">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4 space-y-3">

          {/* SEARCH */}
          <div className="flex">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border w-full px-3 py-2"
              placeholder="Search..."
            />
            <button
              onClick={handleSearchSubmit}
              className="bg-green-700 text-white px-4"
            >
              <FaSearch />
            </button>
          </div>

          {/* LINKS */}
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>

          {/* DASHBOARD MOBILE */}
          {isAdmin && (
            <button
              onClick={() => {
                navigate("/admin");
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-green-700 font-semibold"
            >
              Dashboard
            </button>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;
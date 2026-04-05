import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext'; // Assuming you have a useCart hook
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { cart } = useCart();
  const { user, userSignOut } = useContext(AuthContext); // Getting user and logout from AuthContext
  const navigate = useNavigate();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogOut =()=>{
    return userSignOut();
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="text-2xl font-bold text-green-700">
          <Link to="/">🌿 PlantShop</Link>
        </div>

        {/* Search Bar */}
        <div className="relative hidden md:flex md:w-1/3">
          <input
            type="text"
            placeholder="Search plants..."
            className="border border-green-700 px-4 py-2 rounded-l w-full focus:outline-none"
          />
          <button className="absolute inset-y-0 right-0 px-4 py-2 bg-green-700 text-white rounded-r hover:bg-green-800 transition duration-300 flex items-center">
            <FaSearch />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-green-700 hover:text-green-900 transition duration-300"
          onClick={handleToggleMobileMenu}
        >
          <FaSearch size={24} />
        </button>

        {/* Navbar Links */}
        <ul className={`flex flex-col md:flex-row md:space-x-6 text-green-700 font-semibold md:items-center ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <li>
            <Link to="/" className="block py-2 md:py-0 hover:text-green-900 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="block py-2 md:py-0 hover:text-green-900 transition duration-300">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about" className="block py-2 md:py-0 hover:text-green-900 transition duration-300">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="block py-2 md:py-0 hover:text-green-900 transition duration-300">
              Contact
            </Link>
          </li>
        </ul>

        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative text-green-700 hover:text-green-900 transition duration-300 hidden md:flex items-center">
            <FaShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Check if user exists */}
          {user ? (
            <div className="flex items-center space-x-3">
              <img
                src={user.photoURL || '/default-avatar.png'} // Use Firebase user photoURL, fallback to default
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-green-700">{user.displayName || 'Anonymous'}</span> {/* Use Firebase displayName */}
              <button
                onClick={handleLogOut}
                className="bg-green-700 text-white px-3 py-2 rounded hover:bg-green-800 transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="bg-green-700 text-white px-3 py-2 rounded hover:bg-green-800 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-green-700 px-3 py-2 rounded border border-green-700 hover:bg-green-700 hover:text-white transition duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

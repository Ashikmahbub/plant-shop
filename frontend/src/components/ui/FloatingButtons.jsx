import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const FloatingButtons = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');

  const cartItemCount = cart.reduce((t, i) => t + i.quantity, 0);

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(search)}`);
    setSearch('');
    setShowSearch(false);
  };

  return (
    <div className="md:hidden">

      {/* Search Input Popup */}
      {showSearch && (
        <div className="fixed bottom-28 right-4 z-50 flex items-center bg-white rounded-full shadow-xl border border-gray-200 overflow-hidden">
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search plants..."
            className="px-4 py-2 text-sm w-48 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-green-700 text-white px-4 py-2"
          >
            <FaSearch size={14} />
          </button>
        </div>
      )}

      {/* Floating Search Button */}
      <div
        onClick={() => setShowSearch(!showSearch)}
        className="fixed bottom-24 right-6 z-50 bg-white border-2 border-green-700 text-green-700 w-12 h-12 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-green-50 transition"
      >
        <FaSearch size={18} />
      </div>

      {/* Floating Cart Button */}
      <div
        onClick={() => navigate('/cart')}
        className="fixed bottom-6 right-6 z-50 bg-green-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-green-800 transition"
      >
        <FaShoppingCart size={22} />
        {cartItemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
            {cartItemCount}
          </span>
        )}
      </div>

    </div>
  );
};

export default FloatingButtons;
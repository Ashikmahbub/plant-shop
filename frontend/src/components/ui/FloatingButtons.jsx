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
        <div className="fixed bottom-28 right-4 z-40 flex items-center bg-white rounded-full shadow-xl border border-gray-200 overflow-hidden">
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search plants..."
            className="px-4 py-2 text-sm w-44 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-green-700 text-white px-4 py-2.5"
          >
            <FaSearch size={13} />
          </button>
        </div>
      )}

      {/* Floating Search Button — bottom-16 */}
      <div
        onClick={() => setShowSearch(!showSearch)}
        className="fixed bottom-16 right-4 z-40 bg-white border-2 border-green-700 text-green-700 w-11 h-11 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-green-50 transition"
      >
        <FaSearch size={16} />
      </div>

      {/* Floating Cart Button — bottom-4 */}
      <div
        onClick={() => navigate('/cart')}
        className="fixed bottom-4 right-4 z-40 bg-green-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-green-800 transition relative"
      >
        <FaShoppingCart size={20} />
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
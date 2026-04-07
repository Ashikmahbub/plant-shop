import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const IMG_URL = process.env.REACT_APP_IMG_URL;

const Cart = () => {
  const { cart, clearCart, updateItemQuantity } = useCart();
  const navigate = useNavigate();

  const handleIncreaseQuantity = (id) => {
    const item = cart.find((item) => item._id === id);
    if (item) updateItemQuantity(id, item.quantity + 1);
  };

  const handleDecreaseQuantity = (id) => {
    const item = cart.find((item) => item._id === id);
    if (item && item.quantity > 1) updateItemQuantity(id, item.quantity - 1);
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + Number(item.price) * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h2 className="text-2xl font-bold text-green-700 mb-8">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg mb-4">Your cart is empty.</p>
          <button
            onClick={() => navigate('/shop')}
            className="text-green-700 underline text-sm"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="divide-y divide-gray-100">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center gap-4 py-4">
                {/* Image */}
                <img
                  src={
                    item.imageUrl?.startsWith('http')
                      ? item.imageUrl
                      : `${IMG_URL}${item.imageUrl}`
                  }
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />

                {/* Title */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">৳ {item.price} each</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecreaseQuantity(item._id)}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 transition text-sm font-bold"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item._id)}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600 transition text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Item Total */}
                <p className="text-sm font-semibold text-gray-800 w-16 text-right">
                  ৳ {(Number(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-6 border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 text-sm">Total</span>
              <span className="text-xl font-bold text-green-700">৳ {getTotalPrice()}</span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <button
                onClick={clearCart}
                className="text-sm text-red-500 hover:text-red-700 underline transition"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="bg-green-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-800 transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
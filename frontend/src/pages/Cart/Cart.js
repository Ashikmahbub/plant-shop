// src/pages/Cart/Cart.js
import React from "react";
import { useCart } from "../../context/CartContext";
 
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, clearCart, updateItemQuantity } = useCart();

  const handleIncreaseQuantity = (id) => {
    const item = cart.find((item) => item._id === id);
    if (item) {
      updateItemQuantity(id, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (id) => {
    const item = cart.find((item) => item._id === id);
    if (item && item.quantity > 1) {
      updateItemQuantity(id, item.quantity - 1);
    }
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item._id} className="border-b border-gray-200 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={`https://plants-shop-server-rho.vercel.app/${item.imageUrl}`}
                      alt={item.title}
                      className="w-16 h-16 mr-4"
                    />
                    <span>{item.title}</span>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleDecreaseQuantity(item._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300"
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition duration-300"
                    >
                      +
                    </button>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between">
            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
            >
              Clear Cart
            </button>
            <button
              onClick={handleProceedToCheckout}
              className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

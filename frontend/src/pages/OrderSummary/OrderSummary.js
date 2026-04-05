import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://plants-shop-server-rho.vercel.app/api/";
const SHIPPING_CHARGE = 10.0; // Flat shipping charge

const OrderSummary = () => {
  const { cart, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, phone, address, city, country } = location.state || {};
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const getTotalWithShipping = () => {
    return (parseFloat(getTotalPrice()) + SHIPPING_CHARGE).toFixed(2);
  };

  const handleConfirmOrder = async () => {
    setIsLoading(true); // Show spinner when the process starts

    try {
      const response = await axios.post(`${API_URL}checkout`, {
        ...location.state,
        cart,
        shippingCharge: SHIPPING_CHARGE, // Include shipping charge in the order data
        totalAmount: getTotalWithShipping(), // Include the total amount including shipping
      });

      toast.success("Order placed successfully!");
      clearCart();
      navigate(`/thank-you/${response.data.orderCode}`);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order.");
      setIsLoading(false); // Hide spinner if there's an error
    }
  };

  if (!name || !cart.length) {
    navigate("/checkout");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Order Summary</h2>

      {/* Customer Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border">
        <h3 className="text-2xl font-semibold mb-4">Customer Details</h3>
        <div className="text-gray-700">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Address:</strong> {address}, {city}, {country}</p>
        </div>
      </div>

      {/* Cart Items Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border">
        <h3 className="text-2xl font-semibold mb-4">Your Cart Items</h3>
        <ul className="divide-y divide-gray-200">
          {cart.map((item) => (
            <li key={item._id} className="py-4 flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={`https://plants-shop-server-rho.vercel.app${item.imageUrl}`}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg shadow-md mr-4"
                />
                <span className="font-medium text-gray-800">{item.title}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 mx-4">Qty: {item.quantity}</span>
                <span className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* Shipping Charge and Total */}
        <div className="mt-6">
          <div className="flex justify-between text-lg font-semibold">
            <span>Shipping Charge:</span>
            <span>${SHIPPING_CHARGE.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-green-700 mt-4">
            <span>Total:</span>
            <span>${getTotalWithShipping()}</span>
          </div>
        </div>
      </div>

      {/* Confirm Order Button or Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center py-6">
          <svg
            className="animate-spin h-10 w-10 text-green-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>
      ) : (
        <button
          onClick={handleConfirmOrder}
          className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition duration-300 w-full md:w-auto"
        >
          Confirm Order
        </button>
      )}
    </div>
  );
};

export default OrderSummary;

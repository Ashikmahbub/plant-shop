import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
 

const API_URL = "http://plants-shop.duckdns.org/api/";
const IMG_URL = process.env.REACT_APP_IMG_URL;
const SHIPPING_CHARGE = 60; // BDT

const OrderSummary = () => {
  const { cart, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, phone, address, city, country } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(''); // 'cod' or 'sslcommerz'

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getTotalWithShipping = () =>
    (getTotalPrice() + SHIPPING_CHARGE).toFixed(2);

  if (!name || !cart.length) {
    navigate("/checkout");
    return null;
  }

  // ── COD Handler ───────────────────────────────────────────
  const handleCOD = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}checkout`, {
        ...location.state,
        cart,
        paymentMethod: 'COD',
        shippingCharge: SHIPPING_CHARGE,
        totalAmount: getTotalWithShipping(),
      });

      toast.success("Order placed successfully!");
      clearCart();
       navigate(`/thank-you/${response.data.orderCode}`, { state: { paymentMethod: 'COD' } });
    } catch (error) {
      toast.error("Failed to place order.");
      setIsLoading(false);
    }
  };

  // ── SSLCommerz Handler ────────────────────────────────────
  const handleSSLCommerz = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}payment/sslcommerz`, {
        ...location.state,
        cart,
        paymentMethod: 'SSLCommerz',
        shippingCharge: SHIPPING_CHARGE,
        totalAmount: getTotalWithShipping(),
      });

      // SSLCommerz returns a payment URL — redirect to it
      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      } else {
        toast.error("Failed to initiate payment.");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Payment initiation failed.");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-green-700 mb-6">Order Summary</h2>

      {/* Customer Details */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border">
        <h3 className="text-xl font-semibold mb-4">Customer Details</h3>
        <div className="text-gray-700 space-y-1">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Address:</strong> {address}, {city}, {country}</p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border">
        <h3 className="text-xl font-semibold mb-4">Your Cart Items</h3>
        <ul className="divide-y divide-gray-200">
          {cart.map((item) => {
            const imageUrl = item.imageUrl?.startsWith('http')
              ? item.imageUrl
              : `${IMG_URL}${item.imageUrl}`;
            return (
              <li key={item._id} className="py-4 flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg shadow-md mr-4"
                  />
                  <span className="font-medium text-gray-800">{item.title}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">Qty: {item.quantity}</span>
                  <span className="font-bold text-gray-800">
                    ৳ {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Totals */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal:</span>
            <span>৳ {getTotalPrice().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping:</span>
            <span>৳ {SHIPPING_CHARGE.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-green-700 pt-2 border-t">
            <span>Total:</span>
            <span>৳ {getTotalWithShipping()}</span>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border">
        <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* COD Option */}
          <div
            onClick={() => setPaymentMethod('cod')}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              paymentMethod === 'cod'
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 hover:border-green-400'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'cod' ? 'border-green-600' : 'border-gray-400'
              }`}>
                {paymentMethod === 'cod' && (
                  <div className="w-3 h-3 rounded-full bg-green-600" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-800">Cash on Delivery</p>
                <p className="text-sm text-gray-500">Pay when your order arrives</p>
              </div>
            </div>
          </div>

          {/* SSLCommerz Option */}
          <div
            onClick={() => setPaymentMethod('sslcommerz')}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              paymentMethod === 'sslcommerz'
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 hover:border-green-400'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'sslcommerz' ? 'border-green-600' : 'border-gray-400'
              }`}>
                {paymentMethod === 'sslcommerz' && (
                  <div className="w-3 h-3 rounded-full bg-green-600" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-800">SSLCommerz</p>
                <p className="text-sm text-gray-500">Pay with bKash, card, bank & more</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Confirm Button */}
      {isLoading ? (
        <div className="flex justify-center items-center py-6">
          <svg className="animate-spin h-10 w-10 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        </div>
      ) : (
        <button
          onClick={paymentMethod === 'cod' ? handleCOD : handleSSLCommerz}
          disabled={!paymentMethod}
          className={`w-full py-3 rounded-lg font-semibold text-white text-lg transition duration-300 ${
            !paymentMethod
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-700 hover:bg-green-800 cursor-pointer'
          }`}
        >
          {!paymentMethod
            ? 'Select a Payment Method'
            : paymentMethod === 'cod'
            ? 'Confirm Order (Cash on Delivery)'
            : 'Proceed to SSLCommerz Payment'}
        </button>
      )}
    </div>
  );
};

export default OrderSummary;
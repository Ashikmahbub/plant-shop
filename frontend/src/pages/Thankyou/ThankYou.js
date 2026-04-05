import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ThankYou = () => {
  // Get the order ID from the URL parameters
  const { orderId } = useParams();

  return (
    <div className="container mx-auto px-4 py-10 text-center bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold text-green-700 mb-6">Thank You for Your Order!</h2>
      <p className="text-gray-700 mb-4">Your order has been placed successfully.</p>
      <p className="text-gray-600 mb-8">
        Order ID: <span className="font-semibold text-green-700">{orderId}</span>
      </p>
      <p className="text-gray-600 mb-8">
        A confirmation email has been sent to you. Please check your inbox for details.
      </p>
      <p className="text-gray-700 font-medium mb-10">
        We appreciate your business and hope you enjoy your new plants!
      </p>

      <Link to="/" className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition duration-300">
        Continue Shopping
      </Link>
    </div>
  );
};

export default ThankYou;
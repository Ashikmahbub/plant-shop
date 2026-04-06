import { useLocation, useParams, Link } from 'react-router-dom';
const ThankYou = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const paymentMethod = location.state?.paymentMethod || 'COD';

  return (
    <div className="container mx-auto px-4 py-10 text-center bg-gray-50 rounded-lg shadow-md">
      <div className="text-6xl mb-4">🌿</div>
      <h2 className="text-4xl font-bold text-green-700 mb-6">Thank You for Your Order!</h2>
      <p className="text-gray-700 mb-4">Your order has been placed successfully.</p>
      <p className="text-gray-600 mb-2">
        Order ID: <span className="font-semibold text-green-700">{orderId}</span>
      </p>
      <p className="text-gray-600 mb-8">
        Payment: <span className="font-semibold text-green-700">{paymentMethod}</span>
      </p>
      {paymentMethod === 'COD' && (
        <p className="text-gray-600 mb-8">
          Please have your payment ready when your order arrives.
        </p>
      )}
      {paymentMethod === 'SSLCommerz' && (
        <p className="text-gray-600 mb-8">
          Your payment was received. A confirmation email has been sent.
        </p>
      )}
      <p className="text-gray-700 font-medium mb-10">
        We appreciate your business and hope you enjoy your new plants!
      </p>
      <Link to="/" className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition duration-300">
        Continue Shopping
      </Link>
    </div>
  );
};
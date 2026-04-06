import { useLocation, useParams, Link } from 'react-router-dom';

const ThankYou = () => {
  const { orderId }   = useParams();
  const location      = useLocation();
  const queryParams   = new URLSearchParams(location.search);
  const paymentStatus = queryParams.get('payment');
  const amountFromUrl = queryParams.get('amount');
  const paymentMethod = paymentStatus === 'success'
    ? 'SSLCommerz'
    : location.state?.paymentMethod || 'COD';

  return (
    <div className="container mx-auto px-4 py-10 text-center bg-gray-50 rounded-lg shadow-md max-w-2xl mt-10">
      
      {/* Icon */}
      <div className="text-6xl mb-4">
        {paymentStatus === 'failed'    ? '❌' :
         paymentStatus === 'cancelled' ? '⚠️' : '🌿'}
      </div>

      {/* Title */}
      <h2 className={`text-4xl font-bold mb-6 ${
        paymentStatus === 'failed'    ? 'text-red-600' :
        paymentStatus === 'cancelled' ? 'text-yellow-600' :
        'text-green-700'
      }`}>
        {paymentStatus === 'failed'    ? 'Payment Failed' :
         paymentStatus === 'cancelled' ? 'Payment Cancelled' :
         'Thank You for Your Order!'}
      </h2>

      <p className="text-gray-700 mb-4">Your order has been saved successfully.</p>

      {/* Order ID */}
      <p className="text-gray-600 mb-2">
        Order ID: <span className="font-semibold text-green-700">{orderId}</span>
      </p>

      {/* Payment Method */}
      <p className="text-gray-600 mb-2">
        Payment: <span className="font-semibold text-green-700">{paymentMethod}</span>
      </p>

      {/* Amount */}
      {amountFromUrl && (
        <p className="text-gray-600 mb-6">
          Amount: <span className="font-semibold text-green-700">৳ {amountFromUrl}</span>
        </p>
      )}

      {/* Status Messages */}
      {paymentStatus === 'success' && (
        <p className="text-green-600 mb-6 font-medium">
          Your payment was received successfully.
        </p>
      )}
      {paymentStatus === 'failed' && (
        <p className="text-red-600 mb-6">
          Your payment failed. Your order is saved — please contact us to complete payment.
        </p>
      )}
      {paymentStatus === 'cancelled' && (
        <p className="text-yellow-600 mb-6">
          You cancelled the payment. Your order is saved — please contact us to complete payment.
        </p>
      )}
      {paymentMethod === 'COD' && (
        <p className="text-gray-600 mb-6">
          Please have your payment ready when your order arrives.
        </p>
      )}

      <p className="text-gray-700 font-medium mb-10">
        We appreciate your business and hope you enjoy your new plants!
      </p>

      <Link
        to="/"
        className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition duration-300"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default ThankYou;
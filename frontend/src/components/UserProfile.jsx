import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getOrdersByEmail } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const statusColors = {
  pending:    'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped:    'bg-purple-100 text-purple-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-700',
};

const UserProfile = () => {
  const { user, userSignOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    getOrdersByEmail(user.email)
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user]);

  const handleSignOut = async () => {
    await userSignOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">

      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 flex items-center gap-6">
        <img
          src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=166534&color=fff`}
          alt="avatar"
          className="w-20 h-20 rounded-full object-cover border-4 border-green-100"
        />
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-800">
            {user.displayName || 'User'}
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">{user.email}</p>
          <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
            Customer
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className="text-sm text-red-500 hover:text-red-700 underline transition"
        >
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-100 mb-6">
        {['orders', 'details'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-semibold capitalize transition border-b-2 ${
              activeTab === tab
                ? 'border-green-700 text-green-700'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab === 'orders' ? `Order History (${orders.length})` : 'My Details'}
          </button>
        ))}
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <>
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-700" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-4">No orders yet.</p>
              <button
                onClick={() => navigate('/shop')}
                className="text-green-700 underline text-sm"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
                >
                  {/* Order Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Order ID</p>
                      <p className="text-sm font-mono font-semibold text-gray-700">
                        #{order.orderCode || order._id}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-0.5">Date</p>
                      <p className="text-sm text-gray-600">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2 mb-4">
                    {order.cart?.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm text-gray-600">
                        <span>{item.title} × {item.quantity}</span>
                        <span>৳ {(Number(item.price) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                    <div className="flex gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        statusColors[order.deliveryStatus?.toLowerCase()] || 'bg-gray-100 text-gray-600'
                      }`}>
                        {order.deliveryStatus || 'Pending'}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        order.paymentMethod === 'COD'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {order.paymentMethod || 'COD'}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-green-700">
                      ৳ {Number(order.totalAmount).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Details Tab */}
      {activeTab === 'details' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Account Details
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Display Name</span>
              <span className="font-medium text-gray-800">{user.displayName || '—'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Email</span>
              <span className="font-medium text-gray-800">{user.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Provider</span>
              <span className="font-medium text-gray-800 capitalize">
                {user.providerData?.[0]?.providerId?.replace('.com', '') || 'Email'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Member Since</span>
              <span className="font-medium text-gray-800">
                {user.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : '—'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Rings } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'https://plants-shop-server-rho.vercel.app/api/';

const OrderEdit = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderName, setOrderName] = useState('');
  const [orderCode, setOrderCode] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [shippingCharge, setShippingCharge] = useState(0);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [newProductId, setNewProductId] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(() => {
    calculateTotalAmount();
  }, [cart, shippingCharge]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${API_URL}admin/orders/${orderId}/edit`);
      const orderData = response.data;

      setOrder(orderData);
      setOrderName(orderData.name);
      setOrderCode(orderData.orderCode);
      setAddress(orderData.address); // corrected from `orderData.ad` to `orderData.address`
      setPhone(orderData.phone);
      setEmail(orderData.email);
      setShippingCharge(orderData.shippingCharge);
      setCart(orderData.cart);
    } catch (error) {
      toast.error('Failed to fetch order details');
    } finally {
      setLoading(false); // Ensure loading is stopped
    }
  };

  const calculateTotalAmount = () => {
    const productTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(productTotal + Number(shippingCharge));
  };

  const updateOrderDetails = async () => {
    try {
      await axios.put(`${API_URL}admin/orders/${orderId}`, {
        orderName,
        orderCode,
        address,
        phone,
        email,
        shippingCharge,
        cart
      });
      toast.success('Order updated successfully');
      navigate('/adminorders');
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  const addProductToOrder = async () => {
    if (newProductId && newQuantity) {
      try {
        const productResponse = await axios.get(`${API_URL}products/${newProductId}`);
        const productData = productResponse.data;

        const newCartItem = {
          productId: newProductId,
          quantity: Number(newQuantity),
          price: productData.price, // Add the price fetched from the product details
        };

        setCart([...cart, newCartItem]);
        setNewProductId('');
        setNewQuantity('');
      } catch (error) {
        toast.error('Failed to fetch product details');
      }
    } else {
      toast.error('Please provide both product ID and quantity');
    }
  };

  const removeProductFromOrder = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Edit Order</h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Rings color="#38a169" height={80} width={80} />
        </div>
      ) : order && (
        <div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold">Customer Name:</label>
              <input
                type="text"
                value={orderName}
                onChange={(e) => setOrderName(e.target.value)}
                className="border px-2 py-1 w-full"
              />
            </div>
            <div>
              <label className="block font-bold">Order ID:</label>
              <input
                type="text"
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value)}
                className="border px-2 py-1 w-full"
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold">Address:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border px-2 py-1 w-full"
              />
            </div>
            <div>
              <label className="block font-bold">Phone:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border px-2 py-1 w-full"
              />
            </div>
            <div>
              <label className="block font-bold">Email:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border px-2 py-1 w-full"
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold">Shipping Charge:</label>
              <input
                type="number"
                value={shippingCharge}
                onChange={(e) => setShippingCharge(e.target.value)}
                className="border px-2 py-1 w-full"
              />
            </div>
            <div>
              <label className="block font-bold">Total Amount:</label>
              <input
                type="text"
                value={totalAmount.toFixed(2)}
                readOnly
                className="border px-2 py-1 w-full bg-gray-200"
              />
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Products in Order:</h3>
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  <span>{item.productId} - {item.quantity} units</span>
                  <button
                    onClick={() => removeProductFromOrder(index)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mb-4">
              <h3 className="font-bold">Add New Product:</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Product ID"
                  value={newProductId}
                  onChange={(e) => setNewProductId(e.target.value)}
                  className="border px-2 py-1"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  className="border px-2 py-1"
                />
                <button
                  onClick={addProductToOrder}
                  className="bg-green-600 text-white px-4 py-1 rounded"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={updateOrderDetails}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Order
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderEdit;

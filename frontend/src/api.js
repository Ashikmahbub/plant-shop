import axios from 'axios';

const API_URL = 'https://plants-shop-server-rho.vercel.app/api';

// Products API
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData);
    console.log('Product created:', response.data);
  } catch (error) {
    console.error('Error creating product:', error);
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/products/${id}`, productData);
    
    return response.data;
    
    
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};

// Orders API (Customers don't need to sign up)
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order with ID ${id}:`, error);
    throw error;
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_URL}/orders/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating order status with ID ${id}:`, error);
    throw error;
  }
};

// Admin Authentication API
export const adminLogin = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/admin/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in as admin:', error);
    throw error;
  }
};

export const adminLogout = async () => {
  try {
    const response = await axios.post(`${API_URL}/admin/logout`);
    return response.data;
  } catch (error) {
    console.error('Error logging out as admin:', error);
    throw error;
  }
};

// Sales Summary API
export const getSalesSummary = async () => {
  try {
    const response = await axios.get(`${API_URL}/sales-summary`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sales summary:', error);
    throw error;
  }
};

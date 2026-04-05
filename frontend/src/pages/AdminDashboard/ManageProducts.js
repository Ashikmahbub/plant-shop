import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProduct from './AddProduct';

const API_URL = 'https://plants-shop-server-rho.vercel.app/api/';
const rootUrl = 'http://localhost:5000';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    }
  };

  const fetchProductsWithToast = async () => {
    await fetchProducts();
    toast.success('Product added successfully'); // Show success toast after adding a product
  };

  const handleEditChange = (e) => {
    setEditProduct({
      ...editProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async (id) => {
    try {
      const formData = new FormData();
      formData.append('title', editProduct.title);
      formData.append('category', editProduct.category);
      formData.append('weight', editProduct.weight);
      formData.append('price', editProduct.price);

      if (editProduct.imageFile) {
        formData.append('image', editProduct.imageFile);
      }

      await axios.put(`${API_URL}admin/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchProducts();
      setEditProduct(null);
      toast.success('Product updated successfully'); // Show success toast after updating
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}admin/products/${id}`);
      fetchProducts();
      toast.success('Product deleted successfully'); // Show success toast after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center mb-6">Manage Products</h2>
      
      <button
        onClick={() => setShowAddProduct(!showAddProduct)}
        className="btn bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-md mb-6 text-lg font-semibold"
      >
        {showAddProduct ? 'Hide Add Product' : 'Add New Product'}
      </button>

      {showAddProduct && <AddProduct onProductAdded={fetchProductsWithToast} />}  

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap">{product.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.weight}</td>
                <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.imageUrl && <img src={`${rootUrl}${product.imageUrl}`} alt={product.title} className="h-12 w-12 object-cover" />}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => setEditProduct(product)}
                    className="btn bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-4 rounded-md mr-2 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Product</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveChanges(editProduct._id);
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editProduct.title}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={editProduct.category}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Weight</label>
                <input
                  type="number"
                  name="weight"
                  value={editProduct.weight}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editProduct.price}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={editProduct.imageUrl}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                />
              </div>
              <button
                type="submit"
                className="btn bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-md w-full text-lg"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditProduct(null)}
                className="btn bg-gray-400 hover:bg-gray-300 text-white py-2 px-4 rounded-md w-full text-lg mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;

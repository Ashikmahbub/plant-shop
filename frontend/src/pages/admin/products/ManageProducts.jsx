import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProduct from './AddProduct';

const API_URL = process.env.REACT_APP_API_URL;
const IMG_URL = process.env.REACT_APP_IMG_URL;

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/products`);
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to load products');
    }
  };

  const fetchProductsWithToast = async () => {
    await fetchProducts();
    setShowAddProduct(false);
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async (id) => {
    try {
      const formData = new FormData();
      formData.append('title',       editProduct.title);
      formData.append('category',    editProduct.category);
      formData.append('weight',      editProduct.weight);
      formData.append('price',       editProduct.price);
      formData.append('description', editProduct.description || '');
      formData.append('sku',         editProduct.sku || '');

      if (editProduct.imageFile) {
        formData.append('image', editProduct.imageFile);
      }

      await axios.put(`${API_URL}/admin/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      fetchProducts();
      setEditProduct(null);
      toast.success('Product updated successfully');
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${API_URL}/admin/products/${id}`);
      fetchProducts();
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    return imageUrl.startsWith('http') ? imageUrl : `${IMG_URL}${imageUrl}`;
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-4 py-4">
                  {product.imageUrl && (
                    <img
                      src={getImageUrl(product.imageUrl)}
                      alt={product.title}
                      className="h-16 w-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-4 font-medium">{product.title}</td>
                <td className="px-4 py-4">
                  {product.sku
                    ? <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-mono">{product.sku}</span>
                    : <span className="text-gray-300 text-xs">—</span>
                  }
                </td>
                <td className="px-4 py-4 capitalize">{product.category}</td>
                <td className="px-4 py-4">{product.weight} g</td>
                <td className="px-4 py-4">৳ {product.price}</td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => setEditProduct(product)}
                    className="btn bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-3 rounded-md mr-2 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn bg-red-600 hover:bg-red-500 text-white py-2 px-3 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-screen overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">Edit Product</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(editProduct._id); }}>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Title</label>
                <input
                  type="text" name="title"
                  value={editProduct.title}
                  onChange={handleEditChange}
                  className="input input-bordered w-full" required
                />
              </div>

              {/* SKU editable in modal */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">SKU</label>
                <input
                  type="text" name="sku"
                  value={editProduct.sku || ''}
                  onChange={handleEditChange}
                  className="input input-bordered w-full font-mono"
                  placeholder="e.g. IND-ROSE-1234"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={editProduct.description || ''}
                  onChange={handleEditChange}
                  className="textarea textarea-bordered w-full"
                  rows={3}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Category</label>
                <select
                  name="category"
                  value={editProduct.category}
                  onChange={handleEditChange}
                  className="select select-bordered w-full"
                >
                  <option value="indoor">Indoor</option>
                  <option value="semi-indoor">Semi-Indoor</option>
                  <option value="office-friendly">Office-Friendly</option>
                  <option value="bonsai">Bonsai</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="succulents">Succulents</option>
                  <option value="herbs">Herbs</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Weight (grams)</label>
                <input
                  type="number" name="weight"
                  value={editProduct.weight}
                  onChange={handleEditChange}
                  className="input input-bordered w-full" required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Price (৳ BDT)</label>
                <input
                  type="number" name="price"
                  value={editProduct.price}
                  onChange={handleEditChange}
                  className="input input-bordered w-full" required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Change Image</label>
                <input
                  type="file" accept="image/*"
                  onChange={(e) => setEditProduct({ ...editProduct, imageFile: e.target.files[0] })}
                  className="file-input file-input-bordered w-full"
                />
                {editProduct.imageUrl && (
                  <img
                    src={getImageUrl(editProduct.imageUrl)}
                    alt="current"
                    className="h-20 w-20 object-cover rounded mt-2"
                  />
                )}
              </div>

              <button type="submit"
                className="btn bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-md w-full text-lg"
              >
                Save Changes
              </button>
              <button type="button"
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
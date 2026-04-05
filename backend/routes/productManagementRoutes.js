const express = require('express');
const { cloudinary, upload } = require('../config/cloudinary');
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById
} = require('../service/productService');
const router = express.Router();

// POST /api/admin/products - Add a product
router.post('/admin/products', upload.single('image'), async (req, res) => {
  const { title, category, weight, price } = req.body;
  const lowerCaseCategory = category.toLowerCase();

  const imageUrl = req.file ? req.file.path : ''; // Cloudinary URL

  try {
    const productData = {
      title,
      category: lowerCaseCategory,
      weight,
      price,
      imageUrl
    };

    await createProduct(productData);
    res.status(201).json({ message: 'Product added successfully!' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// PUT /api/admin/products/:id - Update a product
router.put('/admin/products/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, category, weight, price } = req.body;
  const lowerCaseCategory = category.toLowerCase();

  try {
    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete old image from Cloudinary if new image is uploaded
    if (req.file && product.imageUrl) {
      const urlParts = product.imageUrl.split('/');
      const publicId = 'plants-shop/' + urlParts[urlParts.length - 1].split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    const imageUrl = req.file ? req.file.path : product.imageUrl;

    const updatedData = {
      title,
      category: lowerCaseCategory,
      weight,
      price,
      imageUrl,
    };

    const result = await updateProduct(id, updatedData);

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Product updated successfully!' });
    } else {
      res.status(404).json({ message: 'Product not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE /api/admin/products/:id - Delete a product
router.delete('/admin/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await getProductById(id);

    // Delete image from Cloudinary
    if (product && product.imageUrl) {
      const urlParts = product.imageUrl.split('/');
      const publicId = 'plants-shop/' + urlParts[urlParts.length - 1].split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    const result = await deleteProduct(id);

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Product deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// GET /api/admin/products - Get all products
router.get('/admin/products', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/admin/products/:id - Get a product by ID
router.get('/admin/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await getProductById(id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;
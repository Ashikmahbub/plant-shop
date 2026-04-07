const redis = require('../config/redis');
const express = require('express');
const { 
  getAllProducts, 
  getProductsByCategory, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
} = require('../service/productService');

const router = express.Router();

// GET /api/products - Get all products
router.get('/products', async (req, res) => {
  try {
    const cache = await redis.get('plantshop:products');

    if (cache) {
      console.log('CACHE HIT');
      return res.json(JSON.parse(cache));
    }

    const products = await getAllProducts();

    await redis.setEx('plantshop:products', 120, JSON.stringify(products));

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id - Get single product by ID
// ⚠️ Must be before any other /:param route to avoid conflicts
router.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST /api/products - Create a new product
router.post('/products', async (req, res) => {
  try {
    await createProduct(req.body);
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT /api/products/:id - Update a product by ID
router.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await updateProduct(id, req.body);
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE /api/products/:id - Delete a product by ID
router.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteProduct(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// GET /api/products/category?name=indoor - Get products by category (query param to avoid ID conflict)
router.get('/products/category', async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Category name is required' });
  }
  try {
    const products = await getProductsByCategory(name);
    res.status(200).json(products);
  } catch (error) {
    console.error(`Error fetching products for category ${name}:`, error);
    res.status(500).json({ error: `Failed to fetch products in category: ${name}` });
  }
});

module.exports = router;
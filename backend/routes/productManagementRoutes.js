const express = require('express');
const multer = require('multer');
const redis = require('../config/redis');

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById
} = require('../service/productService');

const router = express.Router();

// ================== MULTER ==================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// ================== CREATE ==================
router.post('/admin/products', upload.single('image'), async (req, res) => {
  try {
    const { title, category, weight, price, description, sku } = req.body;

    const productData = {
      title,
      category: category.toLowerCase(),
      weight,
      price,
      description,
      sku,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : ''
    };

    await createProduct(productData);
    await redis.del('plantshop:products');
    res.status(201).json({ message: 'Product added successfully!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// ================== UPDATE ==================
router.put('/admin/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, weight, price, description, sku } = req.body;

    const product = await getProductById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const updatedData = {
      title,
      category: category.toLowerCase(),
      weight,
      price,
      description,
      sku,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : product.imageUrl
    };

    const result = await updateProduct(id, updatedData);

    if (result.modifiedCount > 0) {
      await redis.del('plantshop:products');
      res.json({ message: 'Product updated successfully!' });
    } else {
      res.status(404).json({ message: 'No changes made' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// ================== DELETE ==================
router.delete('/admin/products/:id', async (req, res) => {
  try {
    const result = await deleteProduct(req.params.id);

    if (result.deletedCount > 0) {
      await redis.del('plantshop:products');
      res.json({ message: 'Product deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ================== GET ALL (WITH CACHE) ==================
router.get('/admin/products', async (req, res) => {
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

// ================== GET ONE ==================
router.get('/admin/products/:id', async (req, res) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;
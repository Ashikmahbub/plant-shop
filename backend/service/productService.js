const { connectToDatabase } = require('../config/dbConnection');
const { ObjectId } = require('mongodb');
const redis = require('../config/redis');

// ================== CREATE ==================
async function createProduct(productData) {
  try {
    const db = await connectToDatabase();
    const productsCollection = db.collection('plants');

    await productsCollection.insertOne(productData);

    // 🔥 CLEAR CACHE
    await redis.del('plantshop:products');

    console.log("Product created successfully");

  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
}

// ================== GET ALL (WITH CACHE) ==================
async function getAllProducts() {
  try {
    const cache = await redis.get('plantshop:products');

    if (cache) {
      console.log("CACHE HIT");
      return JSON.parse(cache);
    }

    const db = await connectToDatabase();
    const productsCollection = db.collection('plants');

    const products = await productsCollection.find().toArray();

    // 🔥 STORE CACHE (2 minutes)
    await redis.setEx('plantshop:products', 120, JSON.stringify(products));

    console.log("DB HIT → cached");

    return products;

  } catch (error) {
    console.error('Error fetching all products:', error);
    throw new Error('Failed to fetch products');
  }
}

// ================== CATEGORY ==================
async function getProductsByCategory(category) {
  try {
    const db = await connectToDatabase();
    const productsCollection = db.collection('plants');

    return await productsCollection.find({ category }).toArray();

  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw new Error('Failed to fetch products by category');
  }
}

// ================== UPDATE ==================
async function updateProduct(id, updatedData) {
  try {
    const db = await connectToDatabase();
    const productsCollection = db.collection('plants');

    const result = await productsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      throw new Error('Product not found');
    }

    // 🔥 CLEAR CACHE
    await redis.del('plantshop:products');

    console.log(`Product updated`);

    return result;

  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
}

// ================== DELETE ==================
async function deleteProduct(id) {
  try {
    const db = await connectToDatabase();
    const productsCollection = db.collection('plants');

    const result = await productsCollection.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      throw new Error('Product not found');
    }

    // 🔥 CLEAR CACHE
    await redis.del('plantshop:products');

    console.log(`Product deleted`);

    return result;

  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product');
  }
}

// ================== GET ONE ==================
async function getProductById(id) {
  try {
    const db = await connectToDatabase();
    const productsCollection = db.collection('plants');

    return await productsCollection.findOne({
      _id: new ObjectId(id)
    });

  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw new Error('Failed to fetch product');
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  getProductById
};
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { MongoClient } = require('mongodb');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function migrate() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const db = client.db('Plants-shop');
  const collection = db.collection('plants');

  // Get all images from Cloudinary organized by folder
  const folderMap = {
    'indoor': [],
    'outdoor': [],
    'bonsai': [],
    'flower': [],
    'semi-indoor': [],
    'home': [],
    'package': [],
    'slider': [],
  };

  for (const folder of Object.keys(folderMap)) {
    const result = await cloudinary.search
      .expression(`folder:plants-shop/${folder}`)
      .max_results(50)
      .execute();
    folderMap[folder] = result.resources.map(r => r.secure_url);
    console.log(`Found ${folderMap[folder].length} images in ${folder}`);
  }

  // Get products by category
  const products = await collection.find().toArray();
  console.log(`Found ${products.length} products`);

  const categoryCounters = {};

  for (const product of products) {
    const cat = product.category.toLowerCase();
    if (!categoryCounters[cat]) categoryCounters[cat] = 0;

    const images = folderMap[cat] || [];
    const imageUrl = images[categoryCounters[cat] % images.length];

    if (imageUrl) {
      await collection.updateOne(
        { _id: product._id },
        { $set: { imageUrl } }
      );
      console.log(`Updated ${product.title} → ${imageUrl}`);
      categoryCounters[cat]++;
    } else {
      console.log(`No image found for category: ${cat}`);
    }
  }

  await client.close();
  console.log('Migration complete!');
}

migrate();
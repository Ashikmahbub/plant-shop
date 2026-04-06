const express = require('express');
const router = express.Router();
const SSLCommerzPayment = require('sslcommerz-lts');
const { connectToDatabase } = require('../config/dbConnection');

const store_id   = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASSWORD;
const is_live    = false;

router.post('/payment/sslcommerz', async (req, res) => {
  const { name, email, phone, address, city, country, cart, totalAmount, shippingCharge } = req.body;

  const tran_id   = 'TXN_' + Date.now();
  const orderCode = 'ORD-' + Date.now();

  try {
    const db = await connectToDatabase();
    await db.collection('orders').insertOne({
      name, email, phone, address, city, country,
      cart,
      shippingCharge,
      totalAmount,
      orderTotal: totalAmount,
      orderCode,
      paymentMethod: 'SSLCommerz',
      paymentStatus: 'Pending',
      deliveryStatus: 'Awaiting Delivery',
      tran_id,
      createdAt: new Date(),
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save order' });
  }

  const data = {
    total_amount:     totalAmount,
    currency:         'BDT',
    tran_id,
    success_url:      `${process.env.BACKEND_URL}/api/payment/success/${tran_id}`,
    fail_url:         `${process.env.BACKEND_URL}/api/payment/fail/${tran_id}`,
    cancel_url:       `${process.env.BACKEND_URL}/api/payment/cancel/${tran_id}`,
    ipn_url:          `${process.env.BACKEND_URL}/api/payment/ipn`,
    shipping_method:  'Courier',
    product_name:     'Plants',
    product_category: 'Plants',
    product_profile:  'general',
    cus_name:         name,
    cus_email:        email,
    cus_add1:         address,
    cus_city:         city,
    cus_country:      country,
    cus_phone:        phone,
    ship_name:        name,
    ship_add1:        address,
    ship_city:        city,
    ship_country:     country,
    ship_postcode:    '1000',
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    res.json({ paymentUrl: apiResponse.GatewayPageURL });
  }).catch(() => {
    res.status(500).json({ error: 'Payment initiation failed' });
  });
});

// Success
router.post('/payment/success/:tran_id', async (req, res) => {
  const { tran_id } = req.params;
  try {
    const db = await connectToDatabase();
    await db.collection('orders').updateOne(
      { tran_id },
      { $set: { paymentStatus: 'Paid' } }
    );
    const order = await db.collection('orders').findOne({ tran_id });
    res.redirect(
      `${process.env.FRONTEND_URL}/thank-you/${order.orderCode || tran_id}?payment=success&amount=${order.totalAmount}`
    );
  } catch (err) {
    res.redirect(`${process.env.FRONTEND_URL}/thank-you/error`);
  }
});

// Fail
router.post('/payment/fail/:tran_id', async (req, res) => {
  const { tran_id } = req.params;
  try {
    const db = await connectToDatabase();
    await db.collection('orders').updateOne(
      { tran_id },
      { $set: { paymentStatus: 'Failed' } }
    );
    const order = await db.collection('orders').findOne({ tran_id });
    res.redirect(
      `${process.env.FRONTEND_URL}/thank-you/${order.orderCode || tran_id}?payment=failed&amount=${order.totalAmount}`
    );
  } catch (err) {
    res.redirect(`${process.env.FRONTEND_URL}/thank-you/error`);
  }
});

// Cancel
router.post('/payment/cancel/:tran_id', async (req, res) => {
  const { tran_id } = req.params;
  try {
    const db = await connectToDatabase();
    await db.collection('orders').updateOne(
      { tran_id },
      { $set: { paymentStatus: 'Cancelled' } }
    );
    const order = await db.collection('orders').findOne({ tran_id });
    res.redirect(
      `${process.env.FRONTEND_URL}/thank-you/${order.orderCode || tran_id}?payment=cancelled&amount=${order.totalAmount}`
    );
  } catch (err) {
    res.redirect(`${process.env.FRONTEND_URL}/thank-you/error`);
  }
});

module.exports = router;
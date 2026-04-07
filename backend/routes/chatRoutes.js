const express = require("express");
const router = express.Router();
const axios = require("axios");

const { getAllProducts } = require("../service/productService");
const { getOrdersByEmail } = require("../service/orderService");

router.post("/chat", async (req, res) => {
  const { message, userEmail } = req.body;

  try {
    // =============================
    // 🔹 INTENT: ORDER → NO AI CALL
    // =============================
    if (message.toLowerCase().includes("order")) {
      if (!userEmail) {
        return res.json({
          reply: "Please login to check your orders 🌿",
        });
      }

      const orders = await getOrdersByEmail(userEmail);

      if (!orders.length) {
        return res.json({
          reply: "You have no orders yet.",
        });
      }

      const latest = orders[0];

      return res.json({
        reply: `
📦 Order Status

🆔 Order ID: ${latest._id}
🚚 Status: ${latest.deliveryStatus}
💰 Total: ৳ ${latest.totalAmount}

Thank you for shopping with us 🌿
`,
      });
    }

    // =============================
    // 🔹 PRODUCTS (SAFE FILTER)
    // =============================
    const products = await getAllProducts();

    const safeProducts = products.slice(0, 20).map((p) => ({
      id: p._id,
      title: p.title,
      price: p.price,
      category: p.category,
    }));

    // =============================
    // 🔹 AI CALL
    // =============================
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a plant shop assistant.

RULES:
- Recommend 2-3 products only
- Keep answers short
- Mention price with ৳
- Suggest based on category
- Do NOT invent products

PRODUCTS:
${JSON.stringify(safeProducts)}
            `,
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    res.json({
      reply: response.data.choices[0].message.content,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      reply: "Something went wrong 🌿",
    });
  }
});

module.exports = router;

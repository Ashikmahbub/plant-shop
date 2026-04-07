# 🌿 PlantShop - Full Stack E-commerce Application

## 🚀 Overview

PlantShop is a full-stack eCommerce platform for selling indoor plants with user authentication, cart system, order management, and admin dashboard.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router
* Context API (Cart)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Payment

* SSLCommerz

### Image Optimization

* WebP format for faster loading

---

## 📦 Features

### 🛍️ Customer Features

* Browse products
* Product detail page
* Add to cart
* Update cart quantity
* Checkout system
* Order history
* Authentication (Login/Register)

---

### 🧑‍💼 Admin Features

* Dashboard (sales overview)
* Product management (CRUD)
* Order management
* User management
* Payment tracking

---

### 📊 Order System

* Store customer details
* Track payment status
* Delivery status updates
* Transaction ID tracking

---

### 🔐 Authentication

* Firebase Auth (Frontend)
* JWT-based protection (Backend)

---

## 📁 Project Structure

```
plant-shop/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── assets/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── services/
│   └── config/
```

---

## 🌐 API Endpoints

### Products

* GET /api/products
* GET /api/products/:id

### Orders

* POST /api/orders
* GET /api/orders/by-email

### Users

* POST /api/users
* GET /api/users

---

## 💳 Payment Integration

* SSLCommerz gateway
* Transaction ID stored
* Payment status tracking

---

## ⚡ Performance Optimization

* WebP images
* Lazy loading
* API optimization

---

## 🔮 Future Improvements

* Redis caching (products & cart)
* Email notifications
* Admin analytics dashboard
* Coupons & discounts
* Product reviews & ratings
* Real-time order updates
* Queue system (BullMQ)

---

## 🧠 Redis Plan (Upcoming)

* Cache product list
* Cache product details
* Store user sessions
* Rate limiting
* Background job processing

---

## 🧪 Development Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🌍 Environment Variables

### Backend (.env)

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_IMG_URL=http://localhost:5000/uploads/
```

---

## 📌 Author

Ashik Mahbub

---

## 📄 License

MIT

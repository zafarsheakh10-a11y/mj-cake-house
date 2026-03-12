# MJ CAKE HOUSE - Full Stack E-commerce Bakery

Production-ready full-stack bakery platform with:
- **Frontend:** Next.js + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Auth:** JWT with hashed passwords

## Project Structure

```
/mj-cake-house
  /frontend
  /backend
  /models
  /routes
  /controllers
  /uploads
  /public
```

## Core Features

### Admin
- Admin login: `/admin/login`
- Admin dashboard: `/admin/dashboard`
- Add/edit/delete products
- Update prices, stock, availability status
- Upload multiple images and video
- Set description, category, tags
- Add customer reviews
- View all orders and update order status
- Change admin password

### Customer
- Browse products and view details
- Register/login/logout
- Add products to cart
- Checkout and place orders
- View own orders
- Leave product reviews
- WhatsApp quick-order button with auto-filled product name + price

### Contact
- Phone: `7007994127`
- WhatsApp orders: `https://wa.me/7309083780`

## Database Rules
- No demo/fake products or placeholder orders are inserted.
- Database starts empty for products and orders.
- Only default admin account is seeded automatically.

## Default Admin Credentials
- Email: `admin@mjcakehouse.com`
- Password: `admin123`

## API Overview
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/admin/login`
- `POST /api/auth/change-password`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)
- `POST /api/products/:id/reviews` (auth)
- `POST /api/orders` (auth)
- `GET /api/orders/my` (auth)
- `GET /api/orders` (admin)
- `PATCH /api/orders/:id/status` (admin)
- `POST /api/uploads/images` (admin)
- `POST /api/uploads/video` (admin)

---

## Step-by-step: Run Locally

### 1) Clone and enter project
```bash
git clone <repo-url>
cd mj-cake-house
```

### 2) Install dependencies
```bash
npm install
```

### 3) Configure backend env
```bash
cp backend/.env.example backend/.env
```
Edit `backend/.env` as needed:
- `MONGO_URI=mongodb://127.0.0.1:27017/mj_cake_house`
- `JWT_SECRET=<strong-random-secret>`
- `FRONTEND_URL=http://localhost:3000`

### 4) Configure frontend env
```bash
cp frontend/.env.local.example frontend/.env.local
```

### 5) Start MongoDB
Make sure your MongoDB server is running locally.

### 6) Start app (frontend + backend)
```bash
npm run dev
```

### 7) Open in browser
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api/health`
- Admin login: `http://localhost:3000/admin/login`

## Production Notes
- Set strong `JWT_SECRET`.
- Use a secure managed MongoDB in production.
- Put backend behind HTTPS reverse proxy.
- Restrict CORS to your production frontend domain.
- Store uploads on S3/Cloud storage for scale.

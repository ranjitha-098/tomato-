# tomato — Full-stack Food Delivery (MERN, no Stripe)

React (Vite) + Express + MongoDB + JWT auth. Payment is **Cash on Delivery**.
Structure and features follow the GreatStack food-delivery tutorial, with an admin area built into the same React app and Stripe replaced by COD.

## Features
- Menu with category filter, cart (saved in the browser)
- Register / login (bcrypt + JWT)
- Checkout with delivery address, order total calculated on the server from database prices
- "My orders" page with live status
- Admin (role-based): add/delete dishes with image upload, view all orders, update order status

## Run it
Needs Node 18+ and MongoDB running locally (or an Atlas URI in `backend/.env`).

```bash
# 1. Backend
cd backend
npm install
npm run seed      # creates the admin user from .env (admin@food.com / admin123)
npm run dev       # http://localhost:4000

# 2. Frontend (new terminal)
cd frontend
npm install
npm run dev       # http://localhost:5173
```

Log in as the admin, open **Admin → Add dish**, and add a few dishes with photos. Before deploying, change `JWT_SECRET` and the admin password in `backend/.env`.

## API
| Method | Route | Access |
|---|---|---|
| POST | /api/auth/register, /api/auth/login | public |
| GET | /api/food/list | public |
| POST | /api/food/add, /api/food/remove | admin |
| POST | /api/order/place | user |
| GET | /api/order/mine | user |
| GET | /api/order/all | admin |
| POST | /api/order/status | admin |

## Add online payments later
Add a `payment` step in `backend/routes/order.js` (Razorpay, Stripe, etc.) and set `paymentMethod` on the order.

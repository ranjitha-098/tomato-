# Project Report: tomato Food Delivery Application

## 1. Title

**tomato — Full-Stack Food Delivery Web Application**

## 2. Problem Statement

Customers often need a simple way to browse food, add dishes to a cart, place an order, and check its status. Restaurants also need a way to manage menu items and process incoming orders. This project provides a web application for those customer and administrator workflows.

## 3. Project Objective

The objective is to build a full-stack food ordering application that allows customers to:

- Browse and filter food by category.
- Add and remove items in a persistent shopping cart.
- Register or log in.
- Provide delivery details and place a Cash on Delivery order.
- View order history and status.

An administrator can add or remove menu items, upload food images, review orders, and update order statuses.

## 4. Technologies Used

| Area | Technologies |
|---|---|
| Frontend | React, JavaScript, Vite, React Router, CSS |
| Backend | Node.js, Express |
| Database | MongoDB with Mongoose |
| Authentication | JSON Web Tokens (JWT), bcryptjs |
| Image uploads | Multer; files served from the backend `uploads` directory |
| API communication | Fetch API and JSON |
| Development | npm |

## 5. Selected YouTube Tutorial

The project README identifies the **GreatStack food-delivery tutorial** as the tutorial the project follows. 

- **Tutorial / channel:** GreatStack food-delivery tutorial
- **YouTube tutorial link:** (https://youtu.be/DBMPXJJfQEA?si=M9oNvMB8ItZ8tKfp)

Add the specific video URL used for this project before submitting the report.

## 6. System/Component Structure

```text
mern-food-delivery/
├── frontend/
│   ├── index.html
│   └── src/
│       ├── main.jsx             # React entry point and global providers
│       ├── App.jsx              # Navigation and route definitions
│       ├── api.js               # Frontend API helper and image URLs
│       ├── styles.css           # Shared styles
│       ├── context/
│       │   └── Store.jsx        # Menu, cart, and authentication state
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── FoodCard.jsx
│       │   ├── AuthModal.jsx
│       │   └── ErrorBoundary.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── Cart.jsx
│           ├── Checkout.jsx
│           ├── Orders.jsx
│           └── Admin.jsx
├── backend/
│   ├── server.js                # Express app and MongoDB connection
│   ├── routes/
│   │   ├── auth.js
│   │   ├── food.js
│   │   └── order.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Food.js
│   │   └── Order.js
│   ├── middleware/
│   │   └── auth.js              # JWT authentication and admin authorization
│   ├── uploads/                 # Uploaded food images
│   └── seed.js                  # Creates the administrator account
└── README.md
```

The frontend has **5 routed pages**: Home/Menu (`/`), Cart (`/cart`), Checkout (`/checkout`), My Orders (`/orders`), and Admin (`/admin`). The Admin page contains Orders, Add dish, and Dishes tabs; these are views within that page, not additional routes. Login and registration are presented in a modal.

The backend exposes API groups for authentication (`/api/auth`), food (`/api/food`), and orders (`/api/order`). MongoDB stores user, food, and order records. The order API verifies the food prices using database records before calculating the total. JWT middleware protects customer and admin operations, with an additional role check for admin-only endpoints.

## 7. Important React Concepts Implemented

- **Components:** The interface is divided into reusable components, including the navigation bar, food cards, and authentication modal.
- **JSX:** Components describe the UI using JavaScript and markup-like syntax.
- **Props:** Food data is passed to `FoodCard` for display.
- **State with `useState`:** Used for category selection, cart quantities, form inputs, and page data.
- **Effects with `useEffect`:** Used to load menu/order data and periodically refresh a customer's order list.
- **Context API:** `StoreProvider` shares menu, cart, and authentication state across pages.
- **Routing:** React Router maps URLs to page components and handles redirects for pages that require login or admin access.
- **Conditional rendering:** The UI changes depending on login status, role, cart contents, and available menu data.
- **Forms and event handling:** Login, registration, delivery details, and admin menu forms use event handlers to submit data.
- **Browser storage:** The cart, user, and token are stored in `localStorage` to preserve state across page reloads.
- **API requests:** The frontend sends requests to the Express backend and renders the returned data.

## 8. Screenshots

Add screenshots from the running application in the spaces below. Capture the page with sample menu items and, where appropriate, signed-in customer/admin data.

1. **Home/Menu page:** `[Insert screenshot of the tomato hero banner, category filters, and food cards]`
2. **Cart page:** `[Insert screenshot showing selected dishes and order total]`
3. **Checkout page:** `[Insert screenshot showing delivery information and Cash on Delivery]`
4. **My Orders page:** `[Insert screenshot showing an order and its current status]`
5. **Admin page:** `[Insert screenshot of the admin orders or menu-management view]`
6. **Login/Register modal (optional):** `[Insert screenshot]`

## 9. Modifications Made

- Renamed the application from **Basil & Co.** to **tomato** in the visible navigation brand, browser title, and README heading.
- Redesigned the Home page with a responsive hero banner, a tomato illustration, a menu call-to-action, and a clearer menu section.
- Refined the visual style of the navigation, hero, and food cards, including responsive layouts and reduced-motion handling.
- Replaced the tutorial's Stripe payment approach with **Cash on Delivery**.
- Added an admin area in the same React application for food and order management.
- The backend calculates order totals from stored food prices rather than relying on client-supplied prices.

## 10. Challenges Faced

During the development of this project, I faced several common challenges:

- **Connecting the frontend and backend:** I had to make sure frontend requests used the correct API routes and that the backend returned data in the format the React components expected.
- **Managing application state:** Keeping the cart and login information available across different pages was challenging. I used React Context for shared state and browser storage to preserve cart and session information after a reload.
- **Working with MongoDB data:** I needed to define suitable schemas for users, food items, and orders, and make sure the application could create and retrieve those records correctly.
- **Implementing login and access control:** I had to distinguish regular users from administrators and restrict checkout, order history, and admin operations to the appropriate users.
- **Calculating order totals accurately:** The total needed to include the current food prices and delivery fee. The backend retrieves prices from the database before saving an order.
- **Uploading and displaying images:** Handling image files required multipart form data, server-side upload support, and a URL the frontend could use to display each image.
- **Making the interface responsive:** The pages needed to remain usable on both desktop and smaller screens, which required adjusting the layout and styles for different viewport sizes.
- **Testing the complete order flow:** I had to check that browsing, adding items, checkout, order placement, and status updates worked together rather than only testing each page separately.

## 11. Conclusion

The tomato food delivery application demonstrates a complete basic ordering flow, from browsing a menu to placing and tracking an order. It combines a React frontend with an Express API and MongoDB persistence, and includes role-protected administration for menu and order management. Cash on Delivery is used for payment in the current version.

## 12. GitHub Link

**Repository URL:** `[Add the GitHub repository URL]`

The repository URL was not available in the project files used to prepare this report. Add the public or classroom repository link before submission.

## 13. YouTube Tutorial Link

**Tutorial URL:** `[Add the exact GreatStack YouTube video URL]`

The project README names GreatStack as the tutorial source but does not record the exact video URL. Confirm and add the video used.

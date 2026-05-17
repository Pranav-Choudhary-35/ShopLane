# ShopLane Ecommerce - Full-Stack eCommerce Application

## Project Overview

ShopLane is a full-stack eCommerce web application built for learning and development purposes. The application features separate Buyer and Seller functionality, product listings with variants, secure authentication, and image management. Built with modern JavaScript/Node.js technologies and scalable architecture patterns.

Current Status: Product Management phase - Basic product creation and variant management working

---

## What's Done So Far

### Authentication & User Management (Completed)

Backend:
- Express.js server with proper middleware setup and error handling
- MongoDB integration using Mongoose ODM
- User model with role-based access control (buyer/seller)
- Email/password authentication with bcrypt password hashing
- JWT token generation and verification
- Google OAuth 2.0 integration with Passport.js
- Input validation using express-validator
- Cookie-based token storage

Frontend:
- React + Vite development setup
- Redux Toolkit for state management
- React Router for client-side navigation
- TailwindCSS for styling
- Login and Registration pages with form validation
- Google Sign-In button integration
- Custom authentication hook for API calls
- Error handling and display on forms

### Product Management (In Progress)

Backend:
- Product data model with title, description, pricing, and seller reference
- Product creation endpoint with image upload support
- Product variant system (different sizes, colors with separate images/pricing)
- ImageKit cloud storage integration for images
- Multer configuration for file uploads (5MB limit, up to 7 images)
- Authentication middleware for seller-only endpoints
- Get products by seller, get all products, and get single product details
- Add variant to product functionality

Frontend:
- Product creation form with image upload
- Product detail page with variant selection
- Product listing pages for buyers and sellers
- Variant attribute display and selection UI

---

## Project Structure

```
ShopLane/
├── Backend/
│   ├── server.js                    Main entry point
│   ├── package.json                 Dependencies
│   └── src/
│       ├── app.js                   Express setup and middleware
│       ├── config/
│       │   ├── config.js            Environment variables
│       │   └── database.js          MongoDB connection
│       ├── controllers/
│       │   ├── auth.controller.js   Login, register, OAuth callback
│       │   └── product.controller.js Product CRUD and variants
│       ├── models/
│       │   ├── user.model.js        User schema
│       │   └── product.model.js     Product and variant schema
│       ├── routes/
│       │   ├── auth.routes.js       Auth endpoints
│       │   └── product.routes.js    Product endpoints
│       ├── middleware/
│       │   └── auth.middleware.js   JWT verification and role checking
│       ├── services/
│       │   └── storage.service.js   ImageKit upload handler
│       └── validator/
│           ├── auth.validator.js    Request validation rules
│           └── product.validator.js Product validation
│
├── Frontend/
│   ├── index.html                   HTML entry
│   ├── package.json                 Dependencies
│   ├── vite.config.js               Build config
│   └── src/
│       ├── main.jsx                 React entry point
│       ├── app/
│       │   ├── App.jsx              Root component
│       │   ├── app.routes.jsx       Route definitions
│       │   ├── app.store.js         Redux setup
│       │   └── index.css            Global styles
│       └── Features/
│           ├── Auth/
│           │   ├── Pages/           Login and Register components
│           │   ├── hook/            useAuth custom hook
│           │   ├── services/        API calls
│           │   └── state/           Redux auth reducer
│           └── products/
│               ├── pages/           Product pages
│               ├── hook/            useProduct custom hook
│               ├── services/        Product API calls
│               └── state/           Redux product reducer
│
└── Readme.md                        This file
```

---

## Technology Stack

Backend:
- Express.js 5.2.1 - Web framework
- MongoDB with Mongoose 9.4.1 - Database
- JWT (jsonwebtoken 9.0.3) - Token authentication
- Passport.js - OAuth 2.0 authentication
- bcryptjs - Password hashing
- express-validator - Input validation
- Multer - File upload handling
- ImageKit - Cloud image storage

Frontend:
- React 19.2.4 - UI library
- Vite 8.0.4 - Build tool and dev server
- Redux Toolkit 2.11.2 - State management
- React Router 7.14.2 - Routing
- TailwindCSS 4.2.4 - Styling
- Axios 1.15.2 - HTTP client
- Lucide React - Icons

---

## Setting Up

### Prerequisites
- Node.js 18+ with npm
- MongoDB (local or MongoDB Atlas)
- Google OAuth credentials
- ImageKit account for image storage

### Environment Variables

Create `.env` in the Backend directory:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/shoplane
JWT_SECRET=your_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
IMAGE_KIT_PRIVATE_KEY=your_imagekit_key
```

### Running the Application

Backend:
```bash
cd Backend
npm install
npm run dev
```
Server starts at http://localhost:5000

Frontend:
```bash
cd Frontend
npm install
npm run dev
```
App opens at http://localhost:5173

---

## How the Application Works

### User Registration and Login Flow

1. User goes to registration page and creates account
2. Can choose to register as buyer or seller
3. Password is hashed with bcrypt before saving
4. On login, password is verified and JWT token is generated
5. Token is stored in cookies for authenticated requests

### Google OAuth Flow

1. User clicks "Sign in with Google"
2. Redirected to Google authentication page
3. After approval, returns to callback endpoint
4. System creates or updates user record
5. JWT token is generated and stored
6. Redirected to dashboard

### Product Creation (Seller)

1. Seller navigates to product creation
2. Uploads product title, description, base price, and up to 7 images
3. Backend validates inputs and seller authorization
4. Images uploaded to ImageKit cloud storage
5. Product record created in MongoDB with image URLs
6. Product appears in seller dashboard and marketplace

### Product Variants

1. Seller can add variants to existing product
2. Variants can have different attributes (Size, Color, etc)
3. Each variant has separate images, stock level, and pricing
4. Buyers can select variants when viewing product
5. Images and price update based on variant selection

---

## API Endpoints

### Authentication
- POST /api/auth/register - Create account
- POST /api/auth/login - Login with email/password
- GET /api/auth/google - Start Google OAuth
- GET /api/auth/google/callback - Handle Google callback
- GET /api/auth/me - Get current user profile

### Products
- POST /api/products - Create product (seller only)
- GET /api/products - Get all products
- GET /api/products/seller - Get seller's products (seller only)
- GET /api/products/:productId - Get product details
- POST /api/products/:productId/variants - Add variant (seller only)

---

## Understanding the Code

### Backend Authentication Flow

The authentication system works in layers:

1. Routes receive request with validation middleware
2. Controller validates credentials or OAuth response
3. User model checks password or creates new user
4. JWT token generated with 10-day expiration
5. Token returned to frontend in cookie

Important files to study:
- auth.controller.js - Handles register, login, OAuth
- auth.middleware.js - Verifies tokens and checks roles
- user.model.js - Password hashing on save

### Backend Product System

Product management flow:

1. Seller sends product data with images
2. authenticateSeller middleware checks authorization
3. Images uploaded to ImageKit via uploadFile service
4. Product created in database with image URLs
5. Variants added as nested documents in product

Important files to study:
- product.controller.js - Create, retrieve, and variant logic
- product.model.js - Schema with variant support
- storage.service.js - ImageKit integration
- product.routes.js - Endpoint definitions

### Frontend State Management

Redux handles authentication and products:

1. Auth slice stores user data and token
2. Product slice stores product listings
3. Hooks (useAuth, useProduct) manage API calls
4. Components dispatch actions to update state
5. Selectors provide computed values to components

Important files to study:
- auth.slice.js - Auth state and reducers
- productSlice.js - Product state management
- useAuth.js - Authentication API wrapper
- useProduct.js - Product API wrapper

---

## What Still Needs Work

Short term:
- Product search and filtering
- Edit/update existing products
- Delete product functionality
- Stock inventory management
- Product reviews and ratings

Medium term:
- Shopping cart functionality
- Order management system
- Order history and tracking
- Payment integration (Stripe/Razorpay)
- Invoice generation

Long term:
- Buyer and seller dashboards
- Analytics and reporting
- Wishlist functionality
- User profile management
- Notifications system

---

## Common Development Tasks

### Testing Product Creation Locally

1. Register as seller account
2. Navigate to dashboard
3. Click "Create Product"
4. Fill title, description, price
5. Upload images (max 5MB each)
6. Click submit
7. Should see product in seller dashboard

### Testing Product Variant Addition

1. From seller dashboard, click product
2. Click "Add Variant" button
3. Enter variant attributes (Size: M, etc)
4. Upload variant images
5. Set variant-specific price and stock
6. Click save
7. Variant appears on product detail page

### Debugging Tips

- Check browser console for frontend errors
- Check terminal for backend console logs
- Verify environment variables are loaded
- Ensure MongoDB connection is working
- Check ImageKit credentials for upload issues
- Verify user has seller role for protected endpoints

---

## Code Quality Standards

The codebase follows these patterns:

- MVC architecture for organization
- Async/await for asynchronous operations
- Try-catch blocks for error handling
- Middleware for cross-cutting concerns
- Validation at route and controller levels
- Environment variables for configuration
- Comments on major functions and complex logic

---

## Important Security Notes

- Never commit .env files
- Always hash passwords before storage
- Validate user input on backend
- Use HTTPS in production
- Implement rate limiting for API
- Check user authorization for sensitive operations
- Keep dependencies updated
- Use environment variables for secrets

---

## Testing the Application Manually

Basic workflow:
1. Start backend server
2. Start frontend dev server
3. Register new account
4. Login with credentials
5. If seller, create a product
6. View product on marketplace
7. Add variant to product
8. Check product detail with variant selection

---

## Development Progress

Started: Basic authentication system
Current: Product creation and variants
Next: Shopping cart and orders

Date last worked on: May 2026

---

## Notes for Contributors

- Write clear commit messages
- Comment complex business logic
- Test manually before committing
- Follow existing code patterns
- Keep frontend and backend changes separate
- Update this README when major features complete

---

For questions about specific parts of the code, look for comments in the files or check the controller/service files for the main business logic.

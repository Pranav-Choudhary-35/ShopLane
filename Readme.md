# ShopLane - Full-Stack eCommerce Application

## 📋 Project Overview

ShopLane is a modern, full-stack eCommerce web application featuring separate Buyer and Seller dashboards, product listings, shopping cart, secure authentication, and seamless checkout flow. Built with scalable backend APIs, role-based access control, and polished frontend UI to deliver a production-ready shopping experience.

**Project Status**: Currently in active development - Product Management phase (Phase 2) 🔄

---

## 🎯 Learning Path & Progress

This project is designed as a learning journey. Below is what we've completed so far and where you should focus your learning:

### Phase 1: Authentication & User Management ✅ (COMPLETED)

#### Backend Implementation:
- ✅ **Express.js Server Setup** - RESTful API with proper middleware
- ✅ **MongoDB Integration** - Mongoose ODM for data persistence
- ✅ **User Model** - User schema with role-based access (buyer/seller), email, password, Google ID
- ✅ **Authentication Routes**:
  - `POST /api/auth/register` - User registration with validation
  - `POST /api/auth/login` - Email/password login with JWT token generation
  - `GET /api/auth/google` - Initiate Google OAuth flow
  - `GET /api/auth/google/callback` - Handle Google OAuth callback
- ✅ **Validation Layer** - Input validation using express-validator
- ✅ **Password Security** - Bcrypt hashing for passwords
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Google OAuth 2.0** - Third-party authentication with Passport.js
- ✅ **Environment Configuration** - Secure config management with validation

#### Frontend Implementation:
- ✅ **React + Vite Setup** - Fast development environment
- ✅ **Redux Toolkit** - State management for auth state
- ✅ **React Router** - Client-side routing
- ✅ **TailwindCSS** - Utility-first styling
- ✅ **Authentication Pages**:
  - `Login.jsx` - Email/password login form with error handling
  - `Register.jsx` - User registration form with validation
- ✅ **Auth Hooks** - Custom `useAuth` hook for API communication
- ✅ **Auth Slice** - Redux reducer for auth state management
- ✅ **Google Login Component** - Official Google Sign-In button with proper branding
- ✅ **Error Handling** - Field-level and general error displays
- ✅ **Form Validation** - Client-side validation feedback

---

### Phase 2: Product Management 🔄 (IN PROGRESS)

#### Backend Implementation:
- ✅ **Product Model** - Mongoose schema with title, description, price, images, seller reference
- ✅ **Product Controller** - `createProduct` function with image upload support
- ✅ **Product Routes** - Protected POST endpoint for sellers
- ✅ **Authentication Middleware** - `authenticateSeller` middleware for role-based access control
- ✅ **Image Upload Service** - ImageKit integration for cloud storage of product images
- ✅ **Multer Configuration** - Memory-based file upload handling (5MB limit, up to 7 images)
- ⏳ Product listing & filtering
- ⏳ GET product endpoints (single & all)
- ⏳ Edit/Update product
- ⏳ Delete product

---

## 🏗️ Project Structure

```
SnitchEcommerce/
├── Backend/
│   ├── server.js                    # Main server entry point
│   ├── package.json                 # Backend dependencies
│   └── src/
│       ├── app.js                   # Express app configuration with middleware
│       ├── config/
│       │   ├── config.js            # Environment variables & validation
│       │   └── database.js          # MongoDB connection setup
│       ├── controllers/
│       │   ├── auth.controller.js   # Authentication logic (register, login, Google callback)
│       │   └── product.controller.js # Product CRUD operations
│       ├── models/
│       │   ├── user.model.js        # User schema with password hashing & comparison
│       │   └── product.model.js     # Product schema with title, price, images, seller ref
│       ├── routes/
│       │   ├── auth.routes.js       # Authentication endpoints
│       │   └── product.routes.js    # Product endpoints with multipart/form-data upload
│       ├── middleware/
│       │   └── auth.middleware.js   # authenticateSeller middleware for role-based access
│       ├── services/
│       │   └── storage.service.js   # ImageKit integration for image upload
│       └── validator/
│           └── auth.validator.js    # Request validation rules
│
├── Frontend/
│   ├── index.html                   # HTML entry point
│   ├── package.json                 # Frontend dependencies
│   ├── vite.config.js               # Vite configuration
│   ├── eslint.config.js             # Code quality rules
│   ├── public/                      # Static assets
│   └── src/
│       ├── main.jsx                 # React app entry
│       ├── app/
│       │   ├── App.jsx              # Root component with routes
│       │   ├── app.routes.jsx       # Route configuration (/, /login, /register)
│       │   ├── app.store.js         # Redux store setup
│       │   └── index.css            # Global styles
│       └── Features/
│           ├── Auth/
│           │   ├── Pages/
│           │   │   ├── Login.jsx    # Login form component
│           │   │   └── Register.jsx # Registration form component
│           │   ├── hook/
│           │   │   └── useAuth.js   # Custom hook for auth operations
│           │   ├── services/
│           │   │   └── auth.api.js  # API calls to backend
│           │   └── state/
│           │       └── auth.slice.js # Redux reducer for auth state
│           └── Components/
│               └── GoogleLogin.jsx  # Official Google Sign-In button
│
└── Readme.md                        # This file

```

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose 9.4.1
- **Authentication**: 
  - JWT (jsonwebtoken 9.0.3)
  - Passport.js with Google OAuth 2.0
- **Security**: bcryptjs for password hashing
- **Validation**: express-validator 7.3.2
- **Development**: Nodemon for hot reload

### Frontend
- **Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.4
- **State Management**: Redux Toolkit 2.11.2
- **Routing**: React Router 7.14.2
- **Styling**: TailwindCSS 4.2.4
- **HTTP Client**: Axios 1.15.2
- **Linting**: ESLint with React plugins

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB instance (local or Atlas)
- Google OAuth credentials (for social login)

### Environment Setup

#### Backend (.env file)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/shoplane
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
IMAGE_KIT_PRIVATE_KEY=your_imagekit_private_key
```

#### Frontend (.env file - if needed)
```
VITE_API_URL=http://localhost:5000
```

### Installation & Running

**Backend:**
```bash
cd Backend
npm install
npm run dev
# Server runs on http://localhost:5000
```

**Frontend:**
```bash
cd Frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## 📚 Learning Guide for Developers

### Understanding the Authentication Flow

#### 1. **Email/Password Authentication**
```
User → Registration Page → Backend Validation → Password Hash → MongoDB Save
     ↓
User → Login Page → Email/Password Verify → JWT Generated → Stored in Cookie/Local Storage
```
 
**Files to Study**:
- Backend: `auth.controller.js` (register/login logic)
- Backend: `auth.routes.js` (route setup)
- Frontend: `Login.jsx`, `Register.jsx` (UI components)
- Frontend: `auth.api.js` (API calls)

#### 2. **Google OAuth Flow**
```
User → Click "Sign in with Google" → Google Authentication
     ↓
Redirect to Callback → Create/Update User → JWT Token → Redirect to Dashboard
```

**Files to Study**:
- Backend: `app.js` (Passport Google Strategy setup)
- Backend: `auth.routes.js` (Google routes)
- Backend: `auth.controller.js` (googleCallback function)
- Frontend: `GoogleLogin.jsx` (Google Sign-In button)

#### 3. **User Model & Roles**
- **Buyer**: Standard user role for purchasing products
- **Seller**: Enhanced role for creating and managing products
- Default role: `buyer`

**Files to Study**:
- Backend: `user.model.js` (schema definition)

#### 4. **Product Creation & Image Upload** (New - Phase 2)
```
Seller → Product Creation Form → Validate Request → Upload Images to ImageKit
       ↓
Save Product with Image URLs → MongoDB → Return Product Data
```

**Files to Study**:
- Backend: `product.model.js` (product schema)
- Backend: `product.controller.js` (createProduct logic)
- Backend: `product.routes.js` (route setup with multer)
- Backend: `storage.service.js` (ImageKit upload service)
- Backend: `auth.middleware.js` (authenticateSeller middleware)

---

## 🔑 Key Features Implemented

### Security Features
- ✅ Password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ Environment variable protection
- ✅ CORS configuration
- ✅ Password comparison for login

### Validation
- ✅ Email format validation
- ✅ Password strength requirements
- ✅ Unique email constraint
- ✅ Required field validation

### API Endpoints (Authentication)

| Method | Endpoint | Purpose | Status |
|--------|----------|---------|--------|
| POST | `/api/auth/register` | Register new user | ✅ Working |
| POST | `/api/auth/login` | Login with credentials | ✅ Working |
| GET | `/api/auth/google` | Initiate Google OAuth | ✅ Working |
| GET | `/api/auth/google/callback` | Google OAuth callback | ✅ Working |
| POST | `/api/products` | Create new product (Seller only, with images) | ✅ Working |

---

## 📋 What's Coming Next (Future Phases)

### Phase 2 (Continued): Product Management
- Product listing & filtering
- GET endpoints for fetching products
- Edit/Update product functionality
- Delete product functionality
- Search functionality

### Phase 3: Shopping Cart & Orders
- Shopping cart state management
- Order creation & management
- Order history tracking
- Inventory management

### Phase 4: Dashboards
- Buyer dashboard with order history
- Seller dashboard with sales analytics
- Product inventory management
- Performance metrics

### Phase 5: Checkout & Payments
- Payment integration (Stripe/Razorpay)
- Order confirmation emails
- Invoice generation
- Refund management

### Phase 6: Additional Features
- Product reviews & ratings
- Wishlist functionality
- User profile management
- Notifications system

---

## 🔍 Code Quality & Best Practices

### Backend Patterns Used
- **MVC Pattern** - Models, Controllers, Routes separation
- **Error Handling** - Validation at multiple layers
- **Environment Config** - Secure config management
- **Middleware** - CORS, body parsing, cookie handling, authentication & authorization
- **Role-Based Access Control** - `authenticateSeller` middleware protects seller endpoints
- **Cloud Storage** - ImageKit integration for scalable image management

### Frontend Patterns Used
- **Redux** - Centralized state management
- **Custom Hooks** - Reusable logic (useAuth)
- **Component Composition** - Reusable components (GoogleLogin)
- **Form Handling** - Controlled components with error states
- **Routing** - Declarative route configuration

---

## 🧪 Testing the Application

### Test Registration
1. Navigate to `http://localhost:5173/register`
2. Fill in email, password, and fullname
3. Click Register
4. Should redirect to login on success

### Test Login
1. Navigate to `http://localhost:5173/login`
2. Enter registered email and password
3. Click Login
4. Token should be received and stored

### Test Google Login
1. On login page, click "Sign in with Google"
2. Complete Google authentication
3. Should create/update user and generate JWT

### Test Product Creation (Seller)
1. Login as a seller account
2. Send POST request to `http://localhost:5000/api/products`
3. Include multipart form data:
   - `title`: Product name
   - `description`: Product description
   - `priceAmount`: Numeric price
   - `priceCurrency`: Currency code (USD, EUR, INR, etc.)
   - `images`: Upload up to 7 images (max 5MB each)
4. Should return created product with image URLs from ImageKit

---

## 📝 Important Notes for Learners

1. **Study the Flow**: Understand how data flows from Frontend → Backend → Database
2. **Middleware Order**: In `app.js`, middleware order matters (CORS before routes)
3. **Validation**: Both frontend and backend validation are important
4. **Security**: Never expose secrets, always use environment variables
5. **Async/Await**: Backend uses async functions; understand promises and error handling
6. **Redux**: Frontend state is managed in Redux slices; study the auth.slice.js

---

## 📞 Common Issues & Solutions

### Backend won't connect to MongoDB
- Check MONGO_URI in .env
- Ensure MongoDB is running
- Check firewall/network settings

### Google OAuth not working
- Verify CLIENT_ID and CLIENT_SECRET in .env
- Ensure callback URL is registered in Google Console
- Check CORS origin is correct

### Frontend can't reach Backend
- Ensure both servers are running
- Check CORS configuration in app.js
- Verify API endpoint URLs in auth.api.js

### Product creation returns 403 Forbidden
- Ensure logged-in user has `role: "seller"`
- Check that JWT token is being sent in cookies
- Verify `authenticateSeller` middleware is properly set up

### Image upload fails
- Check IMAGE_KIT_PRIVATE_KEY is set in .env
- Ensure images are under 5MB each
- Maximum 7 images per request
- Verify ImageKit credentials are valid

---

## 🎓 Learning Objectives

By studying this project, you will learn:

✅ Full-stack JavaScript/Node.js development  
✅ Express.js server setup and middleware  
✅ MongoDB database design and queries  
✅ User authentication (JWT + OAuth)  
✅ React components and hooks  
✅ Redux state management  
✅ Form validation and error handling  
✅ RESTful API design  
✅ Security best practices  
✅ Production-ready code structure  

---

## 📄 License

This project is created for learning and development purposes.

---

## 👨‍💻 Development Notes

- **Last Updated**: April 2026
- **Current Phase**: Product Management (Phase 2 - In Progress)
- **Latest Addition**: Product creation with image upload to ImageKit
- **Next Focus**: Product listing, filtering, and CRUD operations
- **Code Style**: ES6+, Arrow functions, Async/Await
- **Database**: MongoDB Atlas recommended for production

# ShopLane

A full-stack eCommerce platform featuring dual-user roles (buyer/seller), dynamic product variants, secure authentication, and integrated payment processing. Built with modern technologies and production-ready architecture patterns.

---

## Overview

ShopLane demonstrates proficiency across the entire software development lifecycle. The platform enables sellers to create and manage products with multiple variants, while buyers browse, select variants, and complete purchases through secure payment integration. The application implements role-based access control, cloud-based image management, and real-time inventory tracking.

**Key Features:**
- Dual authentication (JWT + Google OAuth 2.0)
- Role-based access control (buyer/seller)
- Multi-variant product management with distinct pricing and inventory
- Cloud image storage with Multer + ImageKit
- Shopping cart with real-time stock validation
- Payment processing with Razorpay integration
- Production-ready error handling and input validation

---

## Technology Stack

| Category | Technologies |
|----------|---------------|
| **Backend** | Node.js, Express.js 5.2, MongoDB, Mongoose 9.4 |
| **Authentication** | JWT, Passport.js (OAuth 2.0), bcryptjs |
| **Frontend** | React 19.2, Vite 8.0, Redux Toolkit 2.11, React Router 7.14 |
| **Styling & UI** | TailwindCSS 4.2, Lucide React Icons |
| **Infrastructure** | Multer (file uploads), ImageKit (cloud storage), Razorpay (payments) |
| **Validation** | express-validator, custom middleware |

---

## Architecture & Design Patterns

### Backend Structure (MVC)
```
src/
├── config/         Database, environment configuration
├── controllers/    Business logic (auth, products, cart, payments)
├── models/         MongoDB schemas with relationships
├── routes/         Endpoint definitions with middleware
├── middlewares/    Authentication, authorization, error handling
├── services/       Third-party integrations (ImageKit, Razorpay)
├── validator/      Input validation rules (express-validator)
└── dao/            Data access operations
```

### Frontend Architecture
```
src/
├── app/
│   ├── App.jsx             Root component
│   ├── app.routes.jsx      Route configuration
│   ├── app.store.js        Redux store setup
│   └── AppLayout.jsx       Layout wrapper
└── features/
    ├── auth/               Authentication module (Redux, hooks, API)
    ├── products/           Product module (CRUD operations, variants)
    ├── cart/               Cart module (inventory, checkout)
    └── Shared/             Reusable components
```

---

## Core Implementation

### Authentication System
- Email/password registration with bcrypt hashing
- JWT token generation (7-day expiration)
- Google OAuth 2.0 integration with automatic user creation
- Role-based middleware for endpoint protection
- Cookie-based token persistence

### Product Management
- **Create:** Sellers upload products with metadata and images (up to 7)
- **Variants:** Distinct pricing, stock levels, and attributes per variant
- **Display:** Buyers view variants with dynamic image/price updates
- **Authorization:** Seller-only endpoints protected by middleware
- **Storage:** CloudKit integration for scalable image management

### Shopping Cart
- Real-time inventory validation during add/update operations
- Stock depletion checks to prevent overselling
- Persistent cart retrieval with populated product details
- Quantity increment with stock availability verification

### Payment Processing
- Razorpay order creation with formatted amounts
- Payment verification using Razorpay utilities
- Order persistence post-payment
- Success/failure callbacks with proper error handling

---

## API Endpoints

**Authentication**
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/google` | Public (OAuth initiation) |
| GET | `/api/auth/google/callback` | Public (OAuth callback) |
| GET | `/api/auth/me` | Protected |

**Products**
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/products` | Protected (Seller) |
| GET | `/api/products` | Public |
| GET | `/api/products/seller` | Protected (Seller) |
| GET | `/api/products/detail/:id` | Public |
| POST | `/api/products/:id/variants` | Protected (Seller) |

**Cart & Payment**
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/cart/add/:productId/:variantId` | Protected |
| GET | `/api/cart` | Protected |
| PATCH | `/api/cart/quantity/increment/:productId/:variantId` | Protected |
| POST | `/api/cart/payment/create/order` | Protected |
| POST | `/api/cart/payment/verify/order` | Protected |

---

## Key Implementation Details

### Security & Validation
- **Input Validation:** express-validator at route and controller levels
- **Password Security:** bcryptjs with automatic pre-save hashing
- **Authorization:** Middleware-based role checking for protected routes
- **CORS:** Configured for development with credential support
- **Token Security:** JWT stored in HTTP-only cookies

### Error Handling
- Try-catch blocks in async operations
- Structured error responses with status codes
- Validation error propagation
- Stock validation error messages with quantities

### Data Relationships
- Users → Products (seller reference)
- Products → Variants (nested documents)
- Cart → Products/Variants (with pricing snapshots)
- Cart → Orders → Payments (transaction history)

---

## Setup & Deployment

### Prerequisites
```
Node.js 18+
MongoDB (local or Atlas)
ImageKit account
Razorpay account
Google OAuth credentials
```

### Environment Configuration

**Backend** - Create `.env` in Backend directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/shoplane
JWT_SECRET=your_secret_key_32_chars_minimum
NODE_ENV=development

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key
IMAGE_KIT_PRIVATE_KEY=your_imagekit_private_key
IMAGE_KIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Installation & Running

**Backend**
```bash
cd Backend
npm install
npm run dev          # Starts at http://localhost:5000
```

**Frontend**
```bash
cd Frontend
npm install
npm run dev          # Starts at http://localhost:5173
```

---

## User Workflows

### Seller: Product Creation
1. Register as seller
2. Navigate to dashboard → Create Product
3. Enter title, description, base price
4. Upload up to 7 images (validated, cloud-stored)
5. System validates inputs and seller authorization
6. Product appears in marketplace and seller dashboard

### Seller: Add Product Variant
1. View product from dashboard
2. Click "Add Variant"
3. Set variant attributes (Size, Color, etc.)
4. Upload variant-specific images
5. Set variant price and stock quantity
6. Variant appears on product detail page for buyers

### Buyer: Browse & Purchase
1. Register as buyer
2. Browse marketplace or search products
3. View product with variant options
4. Add variant to cart with quantity
5. Proceed to checkout
6. Complete payment via Razorpay
7. Order confirmation and success page

---

## Features Implemented

**Core Functionality**
- Complete user authentication system (email/password + OAuth)
- Product creation, listing, and variant management
- Role-based access control for seller operations
- Shopping cart with real-time validation
- Payment integration and order processing
- Image upload and cloud storage

**Code Quality**
- MVC architecture for maintainability
- Middleware-based concern separation
- Validation at multiple layers
- Error handling throughout
- Comments on complex business logic
- Scalable database schema design

---

## Development Roadmap

**Short Term**
- Advanced product search and filtering
- Product edit and delete functionality
- Order history and tracking
- Product reviews and ratings system

**Medium Term**
- Seller and buyer analytics dashboards
- Wishlist functionality
- Inventory alerts and stock management
- Email notifications system

**Long Term**
- Admin panel for platform management
- Advanced analytics and reporting
- Recommendation engine
- Real-time inventory synchronization
- Multi-seller warehouse management

---

## Code Quality Standards

The implementation follows industry best practices:

- **Async/Await:** Promise-based async operations throughout
- **Error Handling:** Comprehensive try-catch with specific error messages
- **Middleware Pattern:** Cross-cutting concerns handled cleanly
- **DRY Principle:** Reusable hooks, services, and middleware
- **Environment Configuration:** All secrets managed via .env
- **Validation:** Multi-layer validation (client + server)
- **Documentation:** Clear code comments and endpoint documentation

---

## Security Considerations

- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens with 7-day expiration
- Role-based authorization on all protected endpoints
- Input validation on every API endpoint
- CORS properly configured for production
- Environment variables for all credentials
- Cloud storage for images (no server storage)
- Stock validation prevents inventory manipulation

---

## Testing Workflow

1. Backend: Start with `npm run dev` in Backend directory
2. Frontend: Start with `npm run dev` in Frontend directory
3. Register new seller account
4. Create product with images
5. Add variants with different attributes
6. Verify image uploads in ImageKit
7. Switch to buyer account
8. Add products to cart
9. Complete payment through Razorpay
10. Verify order in database

---

## File Organization

```
ShopLane/
├── Backend/
│   ├── server.js
│   ├── package.json
│   └── src/
│       ├── app.js                 Express app with middleware setup
│       ├── config/
│       │   ├── config.js          Environment variables
│       │   └── db.js              MongoDB connection
│       ├── controllers/           Business logic for each feature
│       ├── models/                Mongoose schemas
│       ├── routes/                API endpoint definitions
│       ├── middlewares/           Auth, authorization, error handling
│       ├── services/              Third-party integrations
│       ├── validator/             Input validation schemas
│       └── dao/                   Data access layer
│
├── Frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── app/
│       │   ├── App.jsx
│       │   ├── app.routes.jsx
│       │   ├── app.store.js       Redux store
│       │   └── AppLayout.jsx
│       └── features/
│           ├── auth/              Auth module (Redux slices, hooks, pages)
│           ├── products/          Product module (CRUD, variants)
│           ├── cart/              Cart & checkout module
│           └── Shared/            Reusable components
│
└── Readme.md
```

---

## Performance & Scalability

- **Image Management:** Cloud storage via ImageKit (reduces server load)
- **Database Indexing:** Mongoose queries optimized for common operations
- **Middleware Caching:** Token validation cached per request
- **State Management:** Redux for efficient frontend state
- **Pagination Ready:** Backend structure supports adding pagination
- **Error Recovery:** Proper error handling prevents cascading failures

---

## Contact & Support

For questions about implementation details, refer to the source files where major business logic is concentrated:
- Authentication: `src/controllers/auth.controller.js`
- Products: `src/controllers/product.controller.js`
- Cart & Payments: `src/controllers/cart.controller.js`
- Frontend State: `src/features/*/state/*.slice.js`

For technical discussions about design decisions or architecture improvements, review the middleware and service files.

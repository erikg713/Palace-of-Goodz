# Palace-of-Goodz
A Web3-powered decentralized marketplace 

## FRONTEND STRUCTURE ##
palace-of-goods/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Product.tsx
│   │   ├── ProductList.tsx
│   │   ├── PaymentModal.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Marketplace.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── vite-env.d.ts
│   └── index.css
├── package.json
└── ...
src/
├── 📁 assets               # Static assets
│   ├── 📁 fonts           # Custom fonts
│   ├── 📁 images          # Optimized images
│   └── 📁 videos          # 
├── 📁 contexts            # Global state managers
│   ├── PiNetwork.tsx     # Pi SDK context
│   ├── Web3Provider.tsx  # Wagmi + Web3Modal
│   └── MarketContext.tsx # Zustand store
│
├── 📁 hooks               # Custom hooks
│   ├── usePiAuth.ts      # Pi auth logic
│   ├── useWeb3.ts        # Web3 interactions
│   └── useSecureFetch.ts # Encrypted API calls
│
├── 📁 pages               # Route components
│   ├── Marketplace.tsx
│   ├── ProductDetail.tsx
│   └── UserDashboard.tsx
│
├── 📁 services           # API/Blockchain services
│   ├── api.ts           # Axios instance
│   ├── pi.ts            # Pi Network service
│   └── web3.ts          # Contract interactions
│
├── 📁 utils              # Helper functions
│   ├── security.ts      # Encryption utils
│   ├── formatters.ts    # Data formatting
│   └── errorHandlers.ts # Error processors
│
├── 📁 types              # TypeScript definitions
├── App.tsx              # Main app router
└── main.tsx             # Entry point
src/
├── 📁 assets               # Static assets
├── 📁 components           # Reusable UI components
│   ├── ProductCard.tsx    # Product display and purchase
│   ├── Navbar.tsx         # Navigation with Pi Wallet connection
│   └── PaymentModal.tsx   # Payment confirmation modal
├── 📁 contexts             # Global state
│   └── PiNetwork.tsx      # Pi SDK and wallet context
├── 📁 pages                # Route components
│   ├── Marketplace.tsx    # Main marketplace page
│   ├── ProductDetail.tsx  # Detailed product view
│   └── UserDashboard.tsx  # User order history
├── 📁 services            # API and Pi Network services
│   ├── pi.ts              # Pi payment service
│   └── api.ts             # Backend API service
├── 📁 utils               # Helper functions
│   ├── formatters.ts      # Data formatting
│   └── errorHandlers.ts   # Error handling
├── App.tsx                # Main app router
└── main.tsx               # Entry point


## BACKEND STRUCTURE ##
backend/
├── routes/
│   ├── auth.js
│   ├── products.js
│   ├── vendors.js
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Vendor.js
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── vendorController.js
├── middleware/
│   ├── authenticate.js
│   └── errorHandler.js
├── config/
│   └── db.js
├── .env
├── server.js

## FRONTEND DEPENDENCIES ##
npm create vite@latest palace-of-goods -- --template react-ts
cd palace-of-goods
npm install @pinetwork-js/sdk @emotion/react @emotion/styled @mui/material wagmi ethers
npm install
mkdir -p src/{components,context,types,utils}


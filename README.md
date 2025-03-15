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


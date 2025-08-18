# Palace of Goodz

A Web3-powered decentralized marketplace using Node.js, Express, and Vue (TypeScript).

---

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Docker Setup](#docker-setup)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Description

Palace of Goods is a decentralized marketplace that allows users to buy and sell goods using Pi Network cryptocurrency. It features secure transactions with blockchain integration, a Node.js & Express backend, and a React frontend.

---

## Features

- ✅ Buy & sell goods using Pi Network cryptocurrency
- ✅ Secure transactions with blockchain integration
- ✅ Node.js & Express.js backend with PostgreSQL database
- ✅ Vue.js (TypeScript) frontend for an optimized UI/UX
- ✅ Redux Toolkit (planned) for state management
- ✅ Cross-chain transactions (Ethereum, Bitcoin, Polygon) - Future expansion

---

## Technology Stack

### Backend (Node.js / Express.js)

- **Express.js** – Lightweight and scalable backend framework
- **PostgreSQL** – Relational database for scalable data storage
- **Pi Network Payment flow system
- **Multer & Cloudinary** – Image uploads & cloud storage
- **Docker** – Containerized development & production
- **PM2** – Process management for production

### Frontend (Vue.js with TypeScript)

- **Vue.js (TypeScript)** – Type-safe and scalable UI
- **Redux Toolkit (Future)** – State management for better UX
- **Material-UI** – Modern component-based UI framework

### Blockchain & Web3

- **Pi Network SDK** – Pi-based cryptocurrency payments
- **Ethereum, Bitcoin, Polygon (Future)** – Multi-chain transaction support

---

### FRONTEND FILE STRUCTURE ###
palace-of-goodz/
├── public/
│   └── index.html
├── src/
│   ├── pi/
│   │   ├── sdk.js
│   │   └── payments.js
│   ├── views/
│   │   └── Home.vue
│   ├── App.vue
│   ├── main.js
│   └── router/
│       └── index.js
├── vite.config.js
├── package.json

### Backend File Structure 
backend/
├── controllers/
│   └── paymentController.js
├── routes/
│   └── paymentRoutes.js
├── utils/
│   └── verifyUser.js
├── server.js
├── .env
├── package.json
```
palace-of-goods/
├── backend/                  # Node.js + Express API
│   ├── src/
│   │   ├── index.js          # Entry point
│   │   ├── routes/
│   │   │   ├── auth.js       # Pi Authentication API
│   │   │   ├── payments.js   # Pi Payment API
│   │   │   └── products.js   # Products API
│   │   ├── db.js             # Database connection
│   │   └── models/
│   │       ├── Product.js
│   │       └── Order.js
│   ├── package.json
│   └── .env
│
├── frontend/                 # React + Tailwind
│   ├── src/
│   │   ├── App.js            # Main app entry
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ProductCard.js
│   │   │   ├── Cart.js
│   │   │   └── Checkout.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Products.js
│   │   │   └── Profile.js
│   │   ├── hooks/
│   │   │   ├── usePiAuth.js      # Custom hook for Pi login
│   │   │   └── usePiPayments.js  # Custom hook for payments
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── tailwind.config.js
│
├── docker-compose.yml        # Optional for DB + services
├── README.md
└── .gitignore
```
## Installation

### Clone the Repository

```bash
git clone https://github.com/erikg713/palace-of-goods.git
cd palace-of-goods
```

### Install Vue CLI-Plugin
vue add pwa
npm init vue@latest

### Backend Setup (Node.js + Express API)

1. Install dependencies:
   ```bash
   cd server
   npm install
   npm install node-cron @pinetwork-js/sdk web3 dotenv express fs moment
   node scripts/seedProducts.js
   ```
2. Apply database migrations and start the development server:
   ```bash
   npm run migrate  # Apply database migrations
   npm run dev      # Start development server
   ```

### Frontend Setup (vue3.js)
---
### Installation

#### Clone the Repository

1. **Clone the repository from GitHub:**
    ```bash
    git clone https://github.com/erikg713/palace-of-goods.git
    cd palace-of-goods
    ```

#### Backend Setup (Node.js + Express API
2. **Install dependencies:**
    ```bash
    npm install express dotenv body-parser cors axios
    PI_API_KEY=sandbox_your_api_key_here

3. **Create a `.env` file in the server directory and add the required environment variables:**
    ```plaintext
    PORT=5000
    DATABASE_URL=postgres://user:password@localhost:5432/palaceofgoods
    JWT_SECRET=your_jwt_secret
    PI_NETWORK_API_KEY=your_pi_network_api_key
    ```

4. **Apply database migrations and start the development server:**
    ```bash
    npm run migrate  # Apply database migrations
    npm run dev      # Start development server
    npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
    ```

5. **Verify that the backend server is running by accessing:**
    ```
    http://localhost:5000
    
#### API Endpoints

**Authentication:**
- `POST /api/users/signup` – Register new users
- `POST /api/users/login` – Login and receive JWT
- `GET /api/users/profile` – Get user details (Requires JWT)

**Products:**
- `GET /api/products` – Fetch all products
- `POST /api/products` – Add new product (Admin only)
- `PUT /api/products/:id` – Edit product details (Admin only)
- `DELETE /api/products/:id` – Remove product (Admin only)

**Payments (Pi Network):**
- `POST /api/payment/create` – Initiate a Pi Network payment
- `POST /api/payment/verify` – Confirm and validate Pi payment

#### Future Roadmap
- 🔹 React Native Mobile App for Android & iOS
- 🔹 Cross-chain Bridge with Ethereum & Bitcoin
- 🔹 NFT Marketplace for digital goods
- 🔹 Automated dispute resolution system
- 🔹 Advanced search & filters for better product discovery

#### Contributing

We welcome contributions! Follow these steps:

1. **Fork the repo:**
    - Click the "Fork" button at the top right of the repository page.

2. **Create a feature branch:**
    ```bash
    git checkout -b feature-branch
    ```

3. **Commit your changes:**
    ```bash
    git commit -m 'Add some feature'
    ```

4. **Push to the branch:**
    ```bash
    git push origin feature-branch
    ```

5. **Open a pull request:**
    - Go to the "Pull Requests" tab of your forked repository.
    - Click "New Pull Request" and select your feature branch.

#### License

This project is licensed under the Pi Network License PIOS. See the [LICENSE](LICENSE) file for details.

---

🚀 Palace of Goods - The Future of Decentralized Commerce!
---

🚀 Palace of Goods - The Future of Decentralized Commerce!
```

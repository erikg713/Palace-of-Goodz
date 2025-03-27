# Palace of Goods

A Web3-powered decentralized marketplace using Node.js, Express, and React (TypeScript).

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

Palace of Goods is a decentralized marketplace that allows users to buy and sell goods using Pi Network cryptocurrency. It features secure transactions with blockchain integration, a Node.js & Express.js backend, and a React (TypeScript) frontend.

---

## Features

- ✅ Buy & sell goods using Pi Network cryptocurrency
- ✅ Secure transactions with blockchain integration
- ✅ JWT-based user authentication for secure access
- ✅ Node.js & Express.js backend with PostgreSQL database
- ✅ React.js (TypeScript) frontend for an optimized UI/UX
- ✅ Redux Toolkit (planned) for state management
- ✅ Cross-chain transactions (Ethereum, Bitcoin, Polygon) - Future expansion

---

## Technology Stack

### Backend (Node.js / Express.js)

- Express.js – Lightweight and scalable backend framework
- PostgreSQL – Relational database for scalable data storage
- JWT (jsonwebtoken) – Secure authentication system
- Multer & Cloudinary – Image uploads & cloud storage
- Docker – Containerized development & production
- PM2 – Process management for production

### Frontend (React.js/Next.js with TypeScript)

- React.js (TypeScript) – Type-safe and scalable UI
- Redux Toolkit (Future) – State management for better UX
- Material-UI – Modern component-based UI framework
/palace-of-goods
│── /lib
│   ├── mongodb.ts   <-- Database connection
│── /models
│   ├── User.ts      <-- Mongoose User schema
│── /pages
│   ├── /api
│   │   ├── /auth
│   │   │   ├── register.ts   <-- User Registration API
│   │   │   ├── login.ts      <-- User Login API
│   │   │   ├── web3-login.ts <-- Web3 Login API
│   ├── /auth
│   │   ├── login.tsx         <-- Login Page
│   │   ├── register.tsx      <-- Register Page
│── /components
│   ├── AuthForm.tsx  <-- Authentication Form Component
│── /styles
│── .env.local
│── next.config.js
│── package.json
│── tsconfig.json


### Blockchain & Web3

- Pi Network SDK – Pi-based cryptocurrency payments
- Ethereum, Bitcoin, Polygon (Future) – Multi-chain transaction support

---

## Getting Started
npx create-next-app@latest palace-of-goods --typescript
cd palace-of-goods

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (16+) & npm/yarn
- MongoDB
- Docker (Optional for deployment)
npm install mongoose next-auth bcryptjs jsonwebtoken ethers @types/jsonwebtoken @types/bcryptjs
---

## Installation

### Clone the Repository

```bash
git clone https://github.com/erikg713/palace-of-goods.git
cd palace-of-goods
```

### Backend Setup (Node.js + Express API)

Install Dependencies:

```bash
cd server
npm install
npm install node-cron
npm install @pinetwork-js/sdk
npm install web3
npm install dotenv express fs moment
npx terser js/main.js -o js/main.min.js --compress --mangle
npx clean-css -o css/styles.min.css css/styles.css
npm run migrate  # Apply database migrations
npm run dev      # Start development server
```

Backend will be running at http://127.0.0.1:5000.

### Frontend Setup (React with TypeScript)

Install Dependencies:

```bash
cd client
npm install react-router-dom
npm install axios react-query
node sitemap.ts
npm start
```

Frontend will be running at http://localhost:3000.

---

## Environment Variables

Create a `.env` file in the server directory and add:

```env
# Add your environment variables here
```

---

## Database Schema

### Users Table

### Products Table

---

## API Endpoints

### Authentication

- `POST /api/users/signup` – Register new users
- `POST /api/users/login` – Login and receive JWT
- `GET /api/users/profile` – Get user details (Requires JWT)

### Products

- `GET /api/products` – Fetch all products
- `POST /api/products` – Add new product (Admin only)
- `PUT /api/products/:id` – Edit product details (Admin only)
- `DELETE /api/products/:id` – Remove product (Admin only)

### Payments (Pi Network)

- `POST /api/payment/create` – Initiate a Pi Network payment
- `POST /api/payment/verify` – Confirm and validate Pi payment

---

## Docker Setup

### Build and Run the Server in Docker

```bash
docker build -t palace-of-goods-server .
docker run -d -p 5000:5000 --env-file .env palace-of-goods-server
```

### Use Docker Compose for Backend & Database

```bash
# Add your Docker Compose instructions here
```

## Future Roadmap

- 🔹 React Native Mobile App for Android & iOS
- 🔹 Cross-chain Bridge with Ethereum & Bitcoin
- 🔹 NFT Marketplace for digital goods
- 🔹 Automated dispute resolution system
- 🔹 Advanced search & filters for better product discovery

---

## Contributing

We welcome contributions! Follow these steps:

1. Fork the repo
2. Create a feature branch:

```bash
git checkout -b feature-name
```

3. Commit changes:

```bash
git commit -m "Added new feature"
```

4. Push to your branch:

```bash
git push origin feature-name
```

5. Submit a pull request

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

🚀 Palace of Goods - The Future of Decentralized Commerce!
```

This improved version provides clear sections, step-by-step instructions, and better navigation.



PalaceOfGoods/frontend
│── public/
│   ├── index.html
│   ├── assets/ (images, icons)
│── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Inventory.tsx
│   │   ├── Transactions.tsx
│   │   ├── Analytics.tsx
│   │   ├── Storefront.tsx
│   ├── context/
│   │   ├── UserContext.tsx
│   │   ├── PaymentContext.tsx
│   ├── redux/
│   │   ├── store.ts
│   │   ├── slices/
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Marketplace.tsx
│   │   ├── Checkout.tsx
│   │   ├── Profile.tsx
│   ├── App.tsx
│   ├── index.tsx
│   ├── styles/
│   │   ├── global.css
│   │   ├── theme.css
│   ├── service-worker.ts
│── package.json
│── tsconfig.json
│── README.md


npx create-react-app palace-of-goods --template typescript
cd palace-of-goods
npm install react-router-dom redux @reduxjs/toolkit styled-components

# Create Vite project with React + TypeScript template
npm create vite@latest palace-of-goods --template react-ts
cd palace-of-goods

# Install dependencies
npm install react-router-dom @reduxjs/toolkit react-redux axios styled-components

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

Palace of Goods is a decentralized marketplace that allows users to buy and sell goods using Pi Network cryptocurrency. It features secure transactions with blockchain integration, a Node.js & Express backend, and a React frontend.

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

- **Express.js** – Lightweight and scalable backend framework
- **PostgreSQL** – Relational database for scalable data storage
- **JWT (jsonwebtoken)** – Secure authentication system
- **Multer & Cloudinary** – Image uploads & cloud storage
- **Docker** – Containerized development & production
- **PM2** – Process management for production

### Frontend (React.js/Next.js with TypeScript)

- **React.js (TypeScript)** – Type-safe and scalable UI
- **Redux Toolkit (Future)** – State management for better UX
- **Material-UI** – Modern component-based UI framework

### Blockchain & Web3

- **Pi Network SDK** – Pi-based cryptocurrency payments
- **Ethereum, Bitcoin, Polygon (Future)** – Multi-chain transaction support

---

## Getting Started

1. Create a new Next.js app with TypeScript:
   ```bash
   npx create-next-app@latest palace-of-goods --typescript
   cd palace-of-goods
   ```

2. Ensure you have the following installed on your system:
   - Node.js (16+) & npm/yarn
   - Postgresql (17+)
   - Docker (Optional for deployment)

3. Install necessary dependencies:
   ```bash
   npm install next-auth bcryptjs jsonwebtoken web3js @types/jsonwebtoken @types/bcryptjs @types/web3js
   ```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/erikg713/palace-of-goods.git
cd palace-of-goods
```

### Backend Setup (Node.js + Express API)

1. Install dependencies:
   ```bash
   cd server
   npm install
   npm install node-cron @pinetwork-js/sdk web3 dotenv express fs moment
   ```

2. Apply database migrations and start the development server:
   ```bash
   npm run migrate  # Apply database migrations
   npm run dev      # Start development server
   ```

### Frontend Setup (React with TypeScript)

1. Install dependencies:
   ```bash
   cd client
   npm install react-router-dom axios@latest react-query
   ```

2. Start the frontend server:
   ```bash
   npm start
   ```
npm install sequelize pg pg-hstore
---

## Environment Variables

Create a `.env` file in the server directory and add the required environment variables.

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

---

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

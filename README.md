# Palace of Goodz

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

### FRONTEND FILE STRUCTURE ###
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo.png
│   │   │   └── background.jpg
│   │   ├── fonts/
│   │   │   ├── OpenSans-Regular.ttf
│   │   │   └── OpenSans-Bold.ttf
│   │   └── styles/
│   │       ├── base/
│   │       │   ├── _reset.css
│   │       │   └── _typography.css
│   │       ├── layout/
│   │       │   ├── _grid.css
│   │       │   └── _header.css
│   │       ├── components/
│   │       │   ├── _button.css
│   │       │   ├── _form.css
│   │       │   └── _navbar.css
│   │       ├── utilities/
│   │       │   ├── _margin.css
│   │       │   ├── _padding.css
│   │       │   └── _text-align.css
│   │       └── main.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Button.tsx
│   │   ├── Form.tsx
│   │   └── Modal.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   └── useTheme.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Dashboard.tsx
│   │   └── NotFound.tsx
│   ├── redux/
│   │   ├── store.ts
│   │   ├── reducers/
│   │   │   ├── authReducer.ts
│   │   │   └── productReducer.ts
│   │   ├── actions/
│   │   │   ├── authActions.ts
│   │   │   └── productActions.ts
│   │   └── types/
│   │       ├── authTypes.ts
│   │       └── productTypes.ts
│   ├── routes/
│   │   ├── PrivateRoute.tsx
│   │   ├── PublicRoute.tsx
│   │   └── AppRoutes.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   └── productService.ts
│   ├── utils/
│   │   ├── validation.ts
│   │   ├── helpers.ts
│   │   └── constants.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── styles/
│       ├── global.css
│       └── theme.ts
└── ...

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
2. Create a feature Title and Description:

Ensure the title is clear and descriptive.
Provide a brief description of your project, including its purpose and key features.
Table of Contents:

Add a table of contents if the README is lengthy. This helps users navigate the document easily.
Installation Instructions:

Provide clear and concise installation instructions. Include prerequisites, dependencies, and step-by-step installation process.
Usage:

Include examples of how to use the project. This could be command examples, screenshots, or code snippets.
Contributing:

Explain how other developers can contribute to the project. Include guidelines for submitting issues and pull requests.
License:

Clearly state the project's license. This informs users how they can use and distribute the project.
Badges:

Add badges for build status, coverage, license, etc. This provides quick insights into the project at a glance.
Contact Information:

Provide contact information or links to social media, website, or documentation for further assistance.
Acknowledgements:

Acknowledge any contributors, libraries, or resources that helped in the development of the project.1. createPayment: Your app's frontend creates the payment. The Payment Flow UI opens, but cannot be interacted with until the payment is approved by your server.
2. onReadyForServerApproval: The JS SDK has obtained the payment identifier (PaymentID) and is passing it to your app for Server-Side approval.
Your app's frontend sends the PaymentID to your app's server. This implementation is your responsibility.
3. Server-Side Approval: Your app's server approves the payment with Pi Servers through the /approve API call. This enables the Pioneer to submit the blockchain transaction (as explained in Phase II below).
---

## License

This project is licensed under the Pi Network License PIOS. See the [LICENSE](LICENSE) file for details.

Got it! Here’s an even more detailed and comprehensive version of the `Getting Started` and `Installation` sections for setting up the Palace of Goods project:

### Getting Started

1. **Create a new Next.js app with TypeScript:**
    ```bash
    npx create-next-app@latest palace-of-goods --typescript
    cd palace-of-goods
    ```

2. **Ensure you have the following installed on your system:**
    - **Node.js (16+) & npm/yarn:**
        - [Download Node.js](https://nodejs.org/) and follow the installation instructions for your operating system.
        - Verify the installation by running:
          ```bash
          node -v
          npm -v
          ```
    - **PostgreSQL (17+):**
        - [Download PostgreSQL](https://www.postgresql.org/download/) and follow the installation instructions for your operating system.
        - Verify the installation by running:
          ```bash
          psql --version
          ```
    - **Docker (Optional for deployment):**
        - [Download Docker](https://www.docker.com/get-started) and follow the installation instructions for your operating system.
        - Verify the installation by running:
          ```bash
          docker --version
          ```

3. **Install necessary dependencies for the Next.js app:**
    ```bash
    npm install next-auth bcryptjs jsonwebtoken web3 @types/jsonwebtoken @types/bcryptjs @types/web3js
    ```

### Installation

#### Clone the Repository

1. **Clone the repository from GitHub:**
    ```bash
    git clone https://github.com/erikg713/palace-of-goods.git
    cd palace-of-goods
    ```

#### Backend Setup (Node.js + Express API)

1. **Navigate to the server directory:**
    ```bash
    cd server
    ```

2. **Install dependencies:**
    ```bash
    npm install
    npm install node-cron @pinetwork-js/sdk web3 dotenv express fs moment sequelize pg pg-hstore
    ```

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
    ```

5. **Verify that the backend server is running by accessing:**
    ```
    http://localhost:5000
    ```

#### Frontend Setup (React with TypeScript)

1. **Navigate to the client directory:**
    ```bash
    cd client
    ```

2. **Install dependencies:**
    ```bash
    npm install react-router-dom axios@latest react-query @types/react-router-dom @types/axios @types/react-query
    ```

3. **Create a `.env` file in the client directory and add the required environment variables:**
    ```plaintext
    REACT_APP_API_URL=http://localhost:5000
    ```

4. **Start the frontend server:**
    ```bash
    npm start
    ```

5. **Verify that the frontend server is running by accessing:**
    ```
    http://localhost:3000
    ```

#### Docker Setup

1. **Build and run the server in Docker:**
    ```bash
    docker build -t palace-of-goods-server .
    docker run -d -p 5000:5000 --env-file .env palace-of-goods-server
    ```

2. **Use Docker Compose for Backend & Database:**

    **Create a `docker-compose.yml` file with the following content:**
    ```yaml
    version: '3.8'
    services:
      db:
        image: postgres:17
        environment:
          POSTGRES_USER: user
          POSTGRES_PASSWORD: password
          POSTGRES_DB: palaceofgoods
        ports:
          - "5432:5432"
        volumes:
          - postgres_data:/var/lib/postgresql/data

      server:
        build: .
        ports:
          - "5000:5000"
        env_file:
          - .env
        depends_on:
          - db

    volumes:
      postgres_data:
    ```

3. **Start the services using Docker Compose:**
    ```bash
    docker-compose up -d
    ```

4. **Verify that the services are running:**
    ```bash
    docker-compose ps
    ```

#### Environment Variables

**Backend (`server/.env`):**
```plaintext
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/palaceofgoods
JWT_SECRET=your_jwt_secret
PI_NETWORK_API_KEY=your_pi_network_api_key
```

**Frontend (`client/.env`):**
```plaintext
REACT_APP_API_URL=http://localhost:5000
```

#### Database Schema

**Users Table:**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Products Table:**
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

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

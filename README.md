# Palace-of-Goodz
A Web3-powered decentralized marketplace 
---
## PROJECT STRUCTURE ##

---
palace-of-goodz/
├── backend/
│   ├── config/
│   │   └── db.ts
│   ├── controllers/
│   │   ├── productController.ts
│   │   ├── orderController.ts
│   │   └── userController.ts
│   ├── models/
│   │   ├── Product.ts
│   │   ├── Order.ts
│   │   └── User.ts
│   ├── routes/
│   │   ├── productRoutes.ts
│   │   ├── orderRoutes.ts
│   │   └── userRoutes.ts
│   ├── utils/
│   │   ├── errorHandlers.ts
│   │   └── validators.ts
│   ├── server.ts
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── tsconfig.json
│   ├── package.json
│   └── vite.config.ts
└── README.md
---
### Setting Up the Project

1. **Initialize the Project**
   ```sh
   npx create-react-app palace-of-goodz --template typescript
   cd palace-of-goodz
   npm install @pinetwork-js/sdk @emotion/react @emotion/styled @mui/material wagmi ethers
   mkdir -p src/{components,context,types,utils}
   ```

2. **Install Backend Dependencies**
   ```sh
   mkdir backend
   cd backend
   npm init -y
   npm install express mongoose dotenv
---
### Initial Code Samples

#### Frontend: Product Component (`Product.tsx`)
```typescript name=src/components/Product.tsx
import React from 'react';

interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const Product: React.FC<ProductProps> = ({ id, name, description, price, image }) => {
  return (
    <div className="product">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{price} Pi</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default Product;
```
---
#### Backend: Product Model (`Product.js`)
```javascript name=backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
```

#### Backend: Server Setup (`server.js`)
```javascript name=backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error(err);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Next Steps
1. **Implement User Authentication**: Set up routes and components for user login, registration, and authentication using Pi Network.
2. **Product Management**: Develop CRUD operations for products (create, read, update, delete) in the backend.
3. **Payment Integration**: Integrate Pi Network for handling payments and transactions.
4. **UI/UX Enhancements**: Focus on optimizing the user experience with responsive design and smooth interactions.
5. **Testing and Deployment**: Test the application thoroughly and deploy it to a cloud platform like AWS, Heroku, or Vercel.

By following these steps and using the provided code samples, you will be able to create a Web3 marketplace app optimized for user experience with Pi Network as the payment system.
---

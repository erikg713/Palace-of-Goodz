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

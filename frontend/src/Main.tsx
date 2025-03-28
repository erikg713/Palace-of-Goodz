import React, { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
// Create a client for React Query
const queryClient = new QueryClient();

interface MainProps {
  children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    // Provide Chakra UI theme
    <ChakraProvider theme={theme}>
      {/* Provide React Query for data fetching */}
      <QueryClientProvider client={queryClient}>
        <div style={styles.container}>
          {/* Include the Navbar at the top */}
          <Navbar />
          
          {/* Render the main content (pages) */}
          <main style={styles.main}>{children}</main>
          
          {/* Include the Footer at the bottom */}
          <Footer />
        </div>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f7f7f7',
  },
  main: {
    flex: 1,
    padding: '20px',
  },
};

export default Main;


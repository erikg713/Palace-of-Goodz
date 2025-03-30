import React, { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./styles/global.css";

const queryClient = new QueryClient();

interface MainProps {
  children: ReactNode;
}

const Main: React.FC<MainProps> = React.memo(({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <div style={styles.container}>
          <Navbar />
          <main style={styles.main}>{children}</main>
          <Footer />
        </div>
      </QueryClientProvider>
    </ChakraProvider>
  );
});

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

export default Main;

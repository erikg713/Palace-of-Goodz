import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context data
interface PiContextType {
  // Add your context state and actions here
  value: number;
  setValue: (value: number) => void;
}

// Create the context with a default value
const PiContext = createContext<PiContextType | undefined>(undefined);

// Provider component
const PiProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<number>(0);

  return (
    <PiContext.Provider value={{ value, setValue }}>
      {children}
    </PiContext.Provider>
  );
};

// Custom hook to use the PiContext
const usePiContext = () => {
  const context = useContext(PiContext);
  if (context === undefined) {
    throw new Error('usePiContext must be used within a PiProvider');
  }
  return context;
};

export { PiProvider, usePiContext };

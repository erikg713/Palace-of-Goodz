import React, { createContext, useContext, useState, ReactNode, FC } from 'react';

// Define the shape of the context data
interface PiContextType {
  value: number;
  setValue: (value: number) => void;
}

// Create the context with a default value
const PiContext = createContext<PiContextType | undefined>(undefined);

// Provider component
const PiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState<number>(0);

  return (
    <PiContext.Provider value={{ value, setValue }}>
      {children}
    </PiContext.Provider>
  );
};

// Custom hook to use the PiContext
const usePiContext = (): PiContextType => {
  const context = useContext(PiContext);
  if (context === undefined) {
    throw new Error('usePiContext must be used within a PiProvider');
  }
  return context;
};

export { PiProvider, usePiContext };

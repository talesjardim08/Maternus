import React, { createContext, useState } from "react";

export const UIContext = createContext({});

export const UIProvider = ({ children }) => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  return (
    <UIContext.Provider value={{ successModalOpen, setSuccessModalOpen }}>
      {children}
    </UIContext.Provider>
  );
};

import React, { createContext, useContext, useState } from "react";

const FlashContext = createContext();

export const FlashProvider = ({ children }) => {
  const [flash, setFlash] = useState(null);

  const showFlash = (message, type = "success", duration = 3000) => {
    setFlash({ message, type });

    setTimeout(() => {
      setFlash(null);
    }, duration);
  };

  return (
    <FlashContext.Provider value={{ flash, showFlash }}>
      {flash && (
        <div className={`flash-message ${flash.type}`}>
          <p>{flash.message}</p>
        </div>
      )}
      {children}
    </FlashContext.Provider>
  );
};

export const useFlash = () => useContext(FlashContext);

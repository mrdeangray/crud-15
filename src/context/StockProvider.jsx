import React, { createContext, useEffect, useState } from "react";

export const StockContext = createContext(null);

const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    const savedStocks =
      JSON.parse(localStorage.getItem("crud-15-stocks")) || [];
    setStocks(savedStocks);
  }, []);
  return (
    <StockContext.Provider value={{ stocks, setStocks }}>
      {children}
    </StockContext.Provider>
  );
};

export default StockProvider;

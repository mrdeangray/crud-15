import React, { useContext } from "react";
import "./read-stocks-styles.css";
import { StockContext } from "../../context/StockProvider";
import Stock from "../Stock";
import { Link } from "react-router-dom";

const ReadStocks = () => {
  const { stocks } = useContext(StockContext);
  return (
    <div className="read-stocks">
      <div className="header">
        <h6>ReadStocks</h6>
      </div>
      <div className="left"></div>
      <div className="main">
        {stocks.map((stock) => {
          return <Stock key={stock.id} stock={stock} />;
        })}
        <Link to={`/create`}>
          <button>Create Stock</button>
        </Link>
        <Link to={`/weather`}>
          <button>Weather</button>
        </Link>
      </div>
      <div className="right"></div>
      <div className="footer"></div>
    </div>
  );
};

export default ReadStocks;

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./delete-styles.css";
import styled from "styled-components";
import { StockContext } from "../../context/StockProvider";

const Msg = styled.p`
  color: blue;
  font-size: 30px;
`;

const DeleteStock = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { stocks, setStocks } = useContext(StockContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currStock, setCurrStock] = useState({});

  useEffect(() => {
    const curr = stocks.find((stock) => stock.id === id);

    setCurrStock(curr);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (event) => {
    event.preventDefault();

    const newStocks = stocks.filter((stock) => stock.id !== id);
    setStocks(newStocks);

    localStorage.setItem("crud-15-stocks", JSON.stringify(newStocks));
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      navigate(`/`);
    }, 2000);
  };

  return (
    <div className="delete">
      <div className="header">
        <Link to={`/`}>Back</Link>
        <h6>Delete: {currStock?.name}</h6>
      </div>
      <div className="left"></div>
      <div className="main">
        <button onClick={handleDelete}>Delete {currStock.name}</button>
      </div>
      <div className="right">
        {stocks.map((stock) => {
          return <span key={stock.id}>{stock.name}, </span>;
        })}
      </div>
      <div className="footer">{isUpdating && <Msg>Deleting...</Msg>}</div>
    </div>
  );
};

export default DeleteStock;

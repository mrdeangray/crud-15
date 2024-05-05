import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./create-styles.css";
import styled from "styled-components";
import { StockContext } from "../../context/StockProvider";
import { v4 as uuid } from "uuid";

const Input = styled.input`
  border: 1px solid blue;
  border-radius: 10px;
  padding: 0;
  background-color: grey;
`;

const Msg = styled.p`
  color: blue;
  font-size: 30px;
`;

const CreateStock = () => {
  const navigate = useNavigate();
  const { stocks, setStocks } = useContext(StockContext);
  const [inputValue, setInputValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const stock = {};
    stock.id = uuid();
    stock.score = 0;
    stock.name = inputValue;
    const newStocks = [...stocks, stock];
    setStocks(newStocks);
    setInputValue("");
    localStorage.setItem("crud-15-stocks", JSON.stringify(newStocks));
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      navigate(`/`);
    }, 2000);
  };

  return (
    <div className="create">
      <div className="header">
        <Link to={`/`}>Back</Link>
        <h6>Create</h6>
      </div>
      <div className="left"></div>
      <div className="main">
        <form onSubmit={handleSubmit}>
          <Input value={inputValue} onChange={handleChange} autoFocus />
        </form>
      </div>
      <div className="right">
        {stocks.map((stock) => {
          return <span key={stock.id}>{stock.name}, </span>;
        })}
      </div>
      <div className="footer">{isUpdating && <Msg>Creating...</Msg>}</div>
    </div>
  );
};

export default CreateStock;

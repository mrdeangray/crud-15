import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./update-styles.css";
import styled from "styled-components";
import { StockContext } from "../../context/StockProvider";


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

const UpdateStock = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { stocks, setStocks } = useContext(StockContext);
  const [inputValue, setInputValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [currStock, setCurrStock] = useState({});

  useEffect(() => {
    const curr = stocks.find((stock) => stock.id === id);
    setInputValue(curr.name);
    setCurrStock(curr);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    
    const newStocks = stocks.map(stock=>{
      if(stock.id===id){
        stock.name = inputValue;
      }
      return stock
    })
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
    <div className="update">
      <div className="header">
        <Link to={`/`}>Back</Link>
        <h6>Update: {currStock?.name}</h6>
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
      <div className="footer">{isUpdating && <Msg>Updating...</Msg>}</div>
    </div>
  );
};

export default UpdateStock;

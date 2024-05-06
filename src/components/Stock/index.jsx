import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./stock-styles.css"

const Stock = ({ stock }) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    getScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getScore = async () => {
    try {
      const { data } = await axios(
        `https://api.github.com/users/${stock.name}`
      );
      setScore(data.public_repos);
    } catch (error) {}
  };

  return (
    <div className="stock">
      <span>{stock.name}</span>
      <span>Score: {score}</span>
      <Link to={`/update/${stock.id}`}>Update</Link>
      <Link to={`/delete/${stock.id}`}>Delete</Link>
    </div>
  );
};

export default Stock;

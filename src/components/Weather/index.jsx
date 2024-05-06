import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Msg = styled.p`
  font-size: 30px;
  color: blue;
`;

const Weather = () => {
  const [currLocation, setCurrLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const API_key = "ea8db75cb0440229e35a360ec462ad29";

  useEffect(() => {
    handleGetCity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetCity = async () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  const successCallback = async (position) => {
    try {
      const { coords } = position;
      setCoordinates(coords);
      const limit = 1;
      const { data } = await axios(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&limit=${limit}&appid=${API_key}`
      );
      setCurrLocation(data[0]);
      setIsLoading(false);
    } catch (error) {
      setErrMsg(error);
      console.log(error);
    }
  };

  const errorCallback = (error) => {
    console.log("failure");
    console.log(error);
    setErrMsg(error);
  };

  const getCityFromCoordinates = async (lat, lon, limit) => {
    // console.log("getCityFromCoordinates");
    try {
      const { data } = await axios(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${API_key}`
      );
      setCurrLocation(data[0]);
      setIsLoading(false);
    } catch (error) {
      setErrMsg(error);
      console.log(error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <>
          <Msg>Loading... waiting for Permission...</Msg>
        </>
      ) : (
        <>
          <Link to={`/`}>Back</Link>
          <h6>Weather</h6>
          <h3>homeCity: {currLocation.name}</h3>
          <h3>State: {currLocation.state}</h3>
          <h3>Country: {currLocation.country}</h3>
          <h1>error: {errMsg[0]}</h1>
          <p>Coordinates:</p>
          <div>
            <span>
              {coordinates?.latitude}, {coordinates?.longitude}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;

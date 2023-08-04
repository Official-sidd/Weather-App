import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components/WeatherApp.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WeatherComponent from "./WeatherComponent";
import { border } from "@mui/system";
import { Backdrop, CircularProgress } from "@mui/material";

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [selectState, setSelectState] = useState("metric");
  const [data, setData] = useState([]);
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [forecasts, setForecasts] = useState([{}, {}, {}, {}, {}, {}, {}]);
  const [open, setOpen] = useState(false);

  const options = {
    method: "GET",
    url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
    params: {
      aggregateHours: "24",
      location: location,
      contentType: "json",
      unitGroup: "metric",
      shortColumnNames: "0",
    },
    headers: {
      "X-RapidAPI-Key": "f0efc2e8f4msh2aed7ebafa44cd7p1f7151jsn5513a8ebfb5d",
      "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
    },
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const formatDate = (date) => {
    const uploadDate = new Date(date);
    const monthsOfYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = uploadDate.getMonth();
    return (
      uploadDate.getDate() +
      " " +
      monthsOfYear[monthIndex] +
      " " +
      uploadDate.getFullYear()
    );
  };

  const formatDateOnly = (date) => {
    const uploadDate = new Date(date);
    const monthsOfYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = uploadDate.getMonth();
    return uploadDate.getDate() + " " + monthsOfYear[monthIndex];
  };

  // function addZero(i) {
  //   if (i < 10) {i = "0" + i}
  //   return i;
  // }

  const formatTime = (date) => {
    // const time = new Date(date);
    const time = new Date(date).toLocaleTimeString("en-US", {
      timeStyle: "short",
    });
    return time;
    // addZero(time.getHours()) +
    // ":" +
    // addZero(time.getMinutes())
  };

  const getWeatherDetails = async (options) => {
    try {
      handleOpen();
      const response = await axios.request(options);
      console.log(response.data);
      // sunsetTime();
      setData(response.data.locations[location].currentConditions);
      setForecasts(response.data.locations[location].values);
      setSunrise(
        formatTime(response.data.locations[location].currentConditions.sunrise)
      );
      setSunset(
        formatTime(response.data.locations[location].currentConditions.sunset)
      );
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  // const handleSelectChange = (event) => {
  //   const selectedValue = event.target.value;
  //   setSelectState(selectedValue);
  // };

  document.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      e.preventDefault();
      getWeatherDetails(options);
    }
  });

  return (
    <>
      {open ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
      <div className="weatherApp" style={{ padding: "1vh", gap: "1rem" }}>
        {/* list all countries in dropdown from api */}
        <div className="form">
          <div
            className="row1"
            style={{ height: "60%", padding: "1rem", gap: 10 }}
          >
            <div
              className="tempArea"
              style={{
                display: "flex",
                flexDirection: "column",
                flexBasis: "100%",
                height: "100%",
                padding: "3vh",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{
                  height: "70%",
                  fontSize: "4em",
                  padding: "1vh",
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "start",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "80%",
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      height: "60%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      padding: "1rem",
                    }}
                  >
                    <WeatherComponent weatherType={data.icon} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "40%",
                      alignItems: "end",
                      alignSelf: "end",
                    }}
                  >
                    {data.temp ? data.temp : 0}
                    <p>&deg;</p>
                    {selectState === "us" ? "F" : "C"}
                  </div>
                </div>
              </div>
              <div
                style={{
                  padding: "1vh",
                  height: "10%",
                  textTransform: "capitalize",
                }}
              >
                {data.icon ? data.icon.replaceAll("-", " ") : ""}
              </div>
              <div
                style={{
                  borderBottom: "1px solid white",
                  height: "5%",
                  margin: "0.5rem",
                }}
              ></div>
              <div
                style={{
                  padding: "1vh",
                  height: "10%",
                  textTransform: "capitalize",
                  display: "flex",
                  gap: 4,
                  alignItems: "center",
                  marginBottom: "0.2rem",
                }}
              >
                <LocationOnIcon />
                {location ? location : ""}
              </div>
              <div
                style={{
                  padding: "1vh",
                  height: "10%",
                  gap: 4,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CalendarTodayIcon />
                {data.datetime ? formatDate(data.datetime) : ""}
              </div>
            </div>

            <div
              className="middle"
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              <div className="searchArea">
                <input type="text" placeholder="Change Location"></input>
              </div>
              <div
                className="cardsContainer"
                style={{
                  display: "flex",
                  height: "50%",
                  justifyContent: "center",
                  gap: "3vh",
                }}
              >
                <div
                  className="cards"
                  style={{
                    width: "15vw",
                    height: "60%",
                    display: "flex",
                    flexDirection: "column",
                    padding: "2vh",
                  }}
                >
                  <p style={{ paddingLeft: "2vh", color: "white" }}>Humidity</p>
                  <p
                    style={{
                      height: "100%",
                      textAlign: "right",
                      fontSize: "5vh",
                      paddingRight: "0.5vh",
                    }}
                  >
                    {data.humidity}
                    <span style={{ fontSize: "1.2rem", marginLeft: "0.5rem" }}>
                      &#37;
                    </span>
                  </p>
                </div>
                <div
                  className="cards"
                  style={{
                    width: "15vw",
                    height: "60%",
                    display: "flex",
                    flexDirection: "column",
                    padding: "2vh",
                  }}
                >
                  <p style={{ paddingLeft: "2vh", color: "white" }}>
                    Visibility
                  </p>
                  <p
                    style={{
                      height: "100%",
                      textAlign: "right",
                      fontSize: "5vh",
                      paddingRight: "0.5vh",
                    }}
                  >
                    {data.visibility}
                    <span style={{ fontSize: "0.9rem", marginLeft: "0.5rem" }}>
                      {selectState === "us" ? "miles" : "km"}
                    </span>
                  </p>
                </div>
                <div
                  className="cards"
                  style={{
                    width: "15vw",
                    height: "60%",
                    display: "flex",
                    flexDirection: "column",
                    padding: "2vh",
                  }}
                >
                  <p style={{ paddingLeft: "2vh", color: "white" }}>
                    Wind Speed
                  </p>
                  <p
                    style={{
                      height: "100%",
                      textAlign: "right",
                      fontSize: "5vh",
                      paddingRight: "0.5vh",
                    }}
                  >
                    {data.wspd}
                    <span style={{ fontSize: "0.9rem", marginLeft: "0.5rem" }}>
                      {selectState === "us" ? "mph" : "km/hr"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div
              className="tempArea"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                padding: "2vh",
                justifyContent: "space-around",
                borderRadius: "16px",
              }}
            >
              <div
                style={{
                  height: "70%",
                  borderBottom: "1px solid white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "end",
                }}
              >
                {data.uvindex}
                {data.feelslike}
                {data.uvindex}
              </div>
              <div style={{ height: "20%", display: "flex", color: "white" }}>
                <div
                  style={{
                    width: "50%",
                    textAlign: "center",
                    borderRight: "1px solid lightgrey",
                  }}
                >
                  <p>Sunrise</p>
                  <p
                    style={{
                      textAlign: "center",
                      padding: 3,
                      fontSize: "3.5vh",
                      color: "white",
                    }}
                  >
                    {sunrise}
                  </p>
                </div>
                <div style={{ width: "50%", textAlign: "center" }}>
                  <p>Sunset</p>
                  <p
                    style={{
                      textAlign: "center",
                      padding: 3,
                      fontSize: "3.5vh",
                      color: "white",
                    }}
                  >
                    {sunset}
                  </p>
                  <></>
                </div>
              </div>
            </div>
          </div>

          {/* forecast */}

          <div
            className="cardsContainer"
            style={{
              display: "flex",
              gap: "5vh",
              justifyContent: "center",
              alignItems: "center",
              height: "40%",
              padding: "3vh",
            }}
          >
            {forecasts.slice(1, 7).map((forecast) => {
              return (
                <div
                  className="cardArea"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "10%",
                    height: "100%",
                    padding: "2vh",
                    justifyContent: "space-around",
                    borderRadius: "16px",
                  }}
                >
                  <p
                    style={{
                      textAlign: "center",
                      borderBottom: "1px solid lightgrey",
                      height: "20%",
                      // paddingBottom: "0.9rem",
                    }}
                  >
                    {forecast.datetime
                      ? formatDateOnly(forecast.datetimeStr)
                      : ""}
                  </p>
                  <p
                    style={{
                      fontSize: "4.5vh",
                      height: "40%",
                      borderBottom: "1px solid lightgrey",
                      // paddingBottom: "0.9rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {forecast.temp}&deg;
                  </p>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "1.6vh",
                      height: "20%",
                      // paddingTop: "0.9rem",
                    }}
                  >
                    {forecast.conditions}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherApp;

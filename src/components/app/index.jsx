import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import MainWeather from "../mainWeather";
import { getWeatherCity } from "../../services/weather";
import Header from "../header";
import "bootstrap/dist/css/bootstrap.min.css";
import ListWeather from "../listWeather";
import Chart from "../chart";

function App() {
  const [sity, setSity] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => getWeatherCity("Москва", setWeather), []);

  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Header setSity={setSity} sity={sity} setWeather={setWeather} />
        <div className="container mx-auto flex flex-col items-center justify-center px-2">
          {weather.cod === "200" && (
            <>
              <Routes>
                <Route
                  path="/"
                  element={
                    <MainWeather
                      city={weather.city.name}
                      temp={Math.floor(weather.list[0].main.temp - 272.15)}
                      icon={weather.list[0].weather[0].icon}
                      descr={weather.list[0].weather[0].description}
                      timezone={weather.city.timezone}
                      time={weather.list[0].dt_txt}
                      humidity={weather.list[0].main.humidity}
                      pressure={weather.list[0].main.pressure}
                      setSity={setSity}
                      windSpeed={weather.list[0].wind.speed}
                    />
                  }
                />
                <Route
                  path="table"
                  element={<ListWeather weather={weather} />}
                />
                <Route path="graphic" element={<Chart data={weather} />} />
              </Routes>
            </>
          )}
        </div>
      </div>
    </HashRouter>
  );
}

export default App;

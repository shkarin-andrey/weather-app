import moment from "moment";
import "moment/locale/ru";

const MainWeather = ({
  city,
  temp,
  icon,
  descr,
  timezone,
  time,
  humidity,
  pressure,
  windSpeed,
}) => {
  return (
    <div className="max-w-2xl w-full border shadow rounded-lg flex flex-col my-5 p-5">
      <h1 className="font-bold uppercase text-4xl text-center">{city}</h1>
      <div className="flex items-center mx-auto">
        <div className="text-6xl text-center">
          {temp > 0 && "+"}
          {temp}°
        </div>
        <div className="w-48">
          <img
            className="w-full"
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={city}
          />
        </div>
      </div>
      <div className="text-left">
        <span className="font-bold">Описание:</span> {descr}
      </div>
      <div>
        <span className="font-bold">Дата:</span>{" "}
        {moment(time).format("DD MMMM YYYY")}
      </div>
      <div>
        <span className="font-bold">Время:</span>{" "}
        {moment(new Date()).format("LT")}
      </div>
      <div>
        <span className="font-bold">UTC:</span> {timezone > 0 && "+"}
        {moment(timezone).format("h")}
      </div>
      <div>
        <span className="font-bold">Влажность:</span> {humidity}%
      </div>
      <div>
        <span className="font-bold">Давление:</span> {pressure} мм. рт. ст.
      </div>
      <div>
        <span className="font-bold">Скорость ветра:</span> {windSpeed} м/с
      </div>
    </div>
  );
};

export default MainWeather;

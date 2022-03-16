import moment from "moment";

const ListWeather = ({ weather }) => {
  return (
    <>
      <h1 className="font-bold uppercase text-4xl text-center mt-5 mb-5">
        {weather.city.name}
      </h1>
      <div className="max-w-2xl w-full flex flex-col gap-y-2 mb-5 border rounded-lg p-2 shadow">
        <div className="grid grid-cols-4 items-center rounded bg-slate-200 px-1">
          <div className="font-bold text-left">Дата и время</div>
          <div className="font-bold text-center">t, °C</div>
          <div className="font-bold text-center">
            Давление,
            <br />
            мм.р.ст.
          </div>
          <div className="font-bold text-right">φ, %</div>
        </div>
        {weather.list.map((x) => {
          return (
            <div
              key={x.dt_txt}
              className="grid grid-cols-4 items-center border rounded px-1"
            >
              <div className="text-left">
                {moment(x.dt_txt).format("DD/MM LT")}
              </div>
              <div className="flex justify-center gap-2">
                {x.main.temp - 272.15 > 0
                  ? "+" + Math.floor(x.main.temp - 272.15)
                  : Math.floor(x.main.temp - 272.15)}
                <img
                  className="w-6 h-6"
                  src={`http://openweathermap.org/img/wn/${x.weather[0].icon}@2x.png`}
                  alt=""
                />
              </div>
              <div className="text-center">{x.main.pressure}</div>
              <div className="text-right">{x.main.humidity}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListWeather;

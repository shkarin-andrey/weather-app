import { createChart } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import moment from "moment";

export const Graphic = ({ data }) => {
  const chartContainerRef = useRef();
  useEffect(() => {
    const tempData = data.list.map((x) => {
      return {
        time: x.dt,
        value: Math.floor(x.main.temp - 272.15),
      };
    });

    const humidityData = data.list.map((x) => {
      return {
        time: x.dt,
        value: x.main.humidity,
      };
    });
    const pressureData = data.list.map((x) => {
      return {
        time: x.dt,
        value: x.main.pressure,
      };
    });

    chartContainerRef.current.innerHTML = "";

    const width = chartContainerRef.current.clientWidth;
    const height = 300;

    const chart = createChart(chartContainerRef.current, {
      width: width,
      height: height,
      leftPriceScale: {
        scaleMargins: {
          top: 0.2,
          bottom: 0.2,
        },
        visible: true,
        borderVisible: false,
      },
      rightPriceScale: {
        visible: false,
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
        secondsVisible: false,
      },
      grid: {
        horzLines: {
          color: "#eee",
        },
        vertLines: {
          color: "#ffffff",
        },
      },
      crosshair: {
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        vertLine: {
          visible: true,
          style: 0,
          width: 2,
          color: "rgba(32, 38, 46, 0.1)",
          labelVisible: false,
        },
      },
    });
    const tempSeries = chart.addAreaSeries({
      topColor: "rgba(126, 33, 195, 0.2)",
      bottomColor: "rgba(126, 33, 195, 0.0)",
      lineColor: "rgb(126, 33, 195)",
      lineWidth: 3,
    });
    const humiditySeries = chart.addAreaSeries({
      topColor: "rgba(126, 33, 100, 0.2)",
      bottomColor: "rgba(126, 33, 100, 0.0)",
      lineColor: "rgb(126, 33, 100)",
      lineWidth: 3,
    });
    const pressureSeries = chart.addAreaSeries({
      topColor: "rgba(102, 156, 255, 0.2)",
      bottomColor: "rgba(102, 156, 255, 0.0)",
      lineColor: "rgb(102, 156, 255)",
      lineWidth: 3,
    });
    tempSeries.setData(tempData);
    humiditySeries.setData(humidityData);
    pressureSeries.setData(pressureData);

    const toolTipWidth = 96;
    const toolTipMargin = 15;
    const priceScaleWidth = 50;

    const toolTip = document.createElement("div");
    toolTip.className = "floating-tooltip-2";
    chartContainerRef.current.appendChild(toolTip);

    chart.subscribeCrosshairMove((param) => {
      if (
        !param.time ||
        param.point.x < 0 ||
        param.point.x > width ||
        param.point.y < 0 ||
        param.point.y > height
      ) {
        return (toolTip.style.display = "none");
      }

      const time = moment.unix(param.time).format("DD/MM LT");

      toolTip.style.display = "block";
      const temp = param.seriesPrices.get(tempSeries);
      const humidity = param.seriesPrices.get(humiditySeries);
      const pressure = param.seriesPrices.get(pressureSeries);

      toolTip.innerHTML = `<div style='color: rgb(126, 33, 195)' class='whitespace-pre text-dv-purple uppercase'>⬤ Темпиратура</div>
                        <div class='mx-1 text-2xl text-dv-black font-bold'>${
                          temp > 0 ? "+" + temp : temp
                        }°C</div>
                        <div style='color: rgb(126, 33, 100)' class='whitespace-pre text-dv-purple uppercase'>⬤ Влажность</div>
                        <div class='mx-1 text-2xl text-dv-black font-bold'>${humidity}%</div>
                        <div style='color: rgb(102, 156, 255)' class='whitespace-pre text-dv-purple uppercase'>⬤ Давление</div>
                        <div class='mx-1 text-2xl text-dv-black font-bold'>${pressure} мм р. ст.</div>
                        <div class='whitespace-pre'>${time}</div>`;
      let left = param.point.x;

      if (left > width - toolTipWidth - toolTipMargin) {
        left = width - toolTipWidth;
      } else if (left < toolTipWidth / 2) {
        left = priceScaleWidth;
      }

      toolTip.style.left = left + "px";
      toolTip.style.top = 0 + "px";
    });
  }, [data]);

  return (
    <>
      <h1 className="font-bold uppercase text-4xl text-center mt-5 mb-5">
        {data.city.name}
      </h1>
      <div
        className="w-full overflow-hidden relative rounded"
        ref={chartContainerRef}
      />
    </>
  );
};

const Chart = ({ data }) => {
  return <Graphic data={data} />;
};

export default React.memo(Chart);

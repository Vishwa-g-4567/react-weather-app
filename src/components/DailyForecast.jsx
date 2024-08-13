import React, { useContext } from "react";
import { DataContext } from "../App";

const DailyForecast = () => {
  const { daily, units } = useContext(DataContext);
  return (
    <>
      <div className="w-full">
        <h2 className="text-white/80 text-[1em] mb-[1em] font-normal min-[768px]:text-[1.125em] uppercase">
          Daily Forecast
        </h2>
        <div className="flex flex-wrap">
          {daily.map((data, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-around items-center mb-[0.3em] py-[0.8em] w-full rounded-md bg-black/20 text-[1.19em] text-center"
            >
              <div className="w-1/3 text-[0.95em] mb-[0.6em] min-[450px]:w-1/6 min-[450px]:-order-2">
                {data.day}
                <div className="text-white/60 text-[0.83em]">{data.date}</div>
              </div>
              <div className="w-1/3 text-[0.95em] mb-[0.6em] min-[450px]:w-1/6">
                {data.low}&deg;
                <div className="text-white/60 text-[0.83em]">Low</div>
              </div>
              <div className="w-1/3 text-[0.95em] mb-[0.6em] min-[450px]:w-1/6">
                {data.high}&deg;
                <div className="text-white/60 text-[0.83em]">High</div>
              </div>
              <div className="w-1/3 text-[0.95em] min-[450px]:w-1/6 min-[450px]:-order-1">
                <img
                  src={data.icon}
                  alt={data.description}
                  className="size-[54px] mx-auto"
                />
              </div>
              <div className="w-1/3 text-[0.95em] min-[450px]:w-1/6">
                {data.humidity}%
                <div className="text-white/60 text-[0.83em]">Humidity</div>
              </div>
              <div className="w-1/3 text-[0.95em] min-[450px]:w-1/6">
                {data.wind}
                {units === "metric" ? "km/h" : "m/s"}
                <div className="text-white/60 text-[0.83em]">Wind</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DailyForecast;

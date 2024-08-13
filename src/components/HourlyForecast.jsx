import React, { useContext } from "react";
import { DataContext } from "../App";

const HourlyForecast = () => {
  const { hourly } = useContext(DataContext);
  return (
    <>
      <div className="hidden w-full min-[700px]:block">
        <h2 className="text-white/80 text-[1em] mt-[1em] font-normal min-[768px]:text-[1.125em] uppercase">
          Hourly Forecast
        </h2>
        <div className="flex justify-between my-[1em]">
          {hourly.map((data, index) => (
            <div
              key={index}
              className="py-[0.8em] w-[12%] rounded-md bg-black/15 text-[1.125em] text-center min-[880px]:w-[5em]"
            >
              <div className="text-white/60 text-[0.83em]">{data.date}</div>
              <div className="text-[0.83em]">{data.time}</div>
              <img
                src={data.icon}
                alt={data.description}
                className="size-[54px] my-[0.5em] mx-auto"
              />
              <div>{data.temp}&deg;</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HourlyForecast;

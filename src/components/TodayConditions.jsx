import React, { useContext } from "react";
import { DataContext } from "../App";

const TodayConditions = () => {
  const {
    units,
    city,
    country,
    date,
    icon,
    temp,
    description,
    high,
    low,
    wind,
    humidity,
    sunrise,
    sunset,
  } = useContext(DataContext);
  return (
    <>
      <div className="w-full">
        <h1 className="text-[2em] font-semibold">{`${city}, ${country}`}</h1>
        <div className="text-base min-[420px]:text-lg">{date}</div>
      </div>
      <div className="flex mt-[1em] w-full min-[700px]:w-1/2">
        <div className="flex-grow-[1.25] text-center">
          <img
            src={icon}
            className="size-[10.5em] text-white"
            alt={description}
          />
        </div>
        <div className="flex-grow-[1.25] text-center">
          <div className="text-[5.25em] font-light">{temp}&deg;</div>
          <div className="-mt-[0.5em] -ml-[0.6em] text-center text-[1.125em] capitalize">
            {description}
          </div>
        </div>
      </div>
      <div className="flex justify-around p-[1em] my-[1em] w-full border-y border-y-white/50 min-[700px]:w-1/2 min-[700px]:mt-[2em] min-[700px]:mb-[1em] min-[700px]:p-0 min-[700px]:border-y-0 min-[700px]:border-l min-[700px]:border-l-white/50">
        <div>
          <div className="min-[700px]:mt-[0.25em] text-[1.44em]">
            {high}&deg;
          </div>
          <div className="text-white/60">High</div>
          <div className="min-[700px]:mt-[0.25em] text-[1.44em]">
            {low}&deg;
          </div>
          <div className="text-white/60">Low</div>
        </div>
        <div>
          <div className="min-[700px]:mt-[0.25em] text-[1.44em]">
            {wind}
            {units === "metric" ? "km/h" : "m/s"}
          </div>
          <div className="text-white/60">Wind</div>
          <div className="min-[700px]:mt-[0.25em] text-[1.44em]">
            {humidity}%
          </div>
          <div className="text-white/60">Humidity</div>
        </div>
        <div>
          <div className="min-[700px]:mt-[0.25em] text-[1.44em]">{sunrise}</div>
          <div className="text-white/60">Sunrise</div>
          <div className="min-[700px]:mt-[0.25em] text-[1.44em]">{sunset}</div>
          <div className="text-white/60">Sunset</div>
        </div>
      </div>
    </>
  );
};

export default TodayConditions;

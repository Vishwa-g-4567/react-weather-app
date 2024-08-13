import React, { useContext } from "react";
import { DataContext } from "../App";
import { BiSearch } from "react-icons/bi";
import { BiCurrentLocation } from "react-icons/bi";

const WeatherInput = () => {
  const { text, setText, setQuery, setUnits } = useContext(DataContext);
  const handleSearch = () => {
    if (text !== "") {
      setQuery({ q: text });
    }
  };
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };
  return (
    <div className="flex flex-row w-full mb-3 items-center justify-center space-x-4">
      <input
        type="text"
        className="w-[150px] min-[460px]:w-full text-gray-500 text-xl p-2 shadow-xl capitalize focus:outline-none placeholder:lowercase rounded-md"
        placeholder="Search City..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <BiSearch
        className="cursor-pointer transition ease-out hover:scale-125 size-[30px] min-[600px]:size-[30px] min-[460px]:size-[45px]"
        onClick={handleSearch}
      />
      <BiCurrentLocation
        className="cursor-pointer transition ease-out hover:scale-125 size-[30px] min-[600px]:size-[30px] min-[460px]:size-[45px]"
        onClick={handleLocationClick}
      />
      <button
        className="text-2xl font-medium transition ease-out hover:scale-125"
        onClick={() => setUnits("metric")}
      >
        &deg;C
      </button>
      <p className="text-2xl font-medium mx-1">|</p>
      <button
        className="text-2xl font-medium transition ease-out hover:scale-125 "
        onClick={() => setUnits("imperial")}
      >
        &deg;F
      </button>
    </div>
  );
};

export default WeatherInput;

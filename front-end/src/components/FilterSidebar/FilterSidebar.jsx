import React from "react";
import "../FilterSidebar/FilterSidebar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import SliderSection from "../SlideFilter/SliderSection";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import BeachSide from "../BeachSide/BeachSide";

const FilterSidebar = ({
  setNation,
  setValue,
  value,
  nation,

  minVal,
  maxVal,
  min,
  max,
  range,
  minValRef,
  maxValRef,
  setMaxVal,
  setMinVal,
  handleChange,
  selectedValue,
  setMinFilter,
  setMaxFilter,
  setRating,
  setNationFilter,
}) => {
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/nations")
      .then((r) => setNation(r.data));
  }, []);

  return (
    <body className="bg-gray-100">
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Search Filter</h1>
        <h3 className="text-lg font-semibold mb-2">Nation:</h3>
        <form>
          <select
            value={selectedValue}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          >
            <option value={0}>Vui lòng chọn quốc gia</option>
            {nation.map((item) => (
              <option value={item.name} key={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </form>

        <div className="mt-8">
          <SliderSection
            minVal={minVal}
            maxVal={maxVal}
            setMaxVal={setMaxVal}
            setMinVal={setMinVal}
            minValRef={minValRef}
            maxValRef={maxValRef}
            range={range}
            min={min}
            max={max}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Rating</h2>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              setNationFilter(selectedValue);
              setMinFilter(minVal);
              setMaxFilter(maxVal);
              setRating(value);
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Filter
          </button>
        </div>
      </div>
    </body>
  );
};

export default FilterSidebar;

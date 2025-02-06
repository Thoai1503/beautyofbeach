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
    <body className="main_filter">
      <Container
        style={{
          paddingLeft: 20,
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.4)",
          backgroundColor: "inherit",
        }}
      >
        <Container className="side_filter">
          <h1 className="filter">Search Filter</h1>
          <h3 className="title-header">Nation:</h3>
          <form>
            <select
              value={selectedValue}
              onChange={handleChange}
              style={{ marginBottom: 20, width: "200px" }}
            >
              <option value={0}>Vui lòng chọn quốc gia</option>
              {nation.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
          </form>
        </Container>

        <Row style={{ marginTop: 50 }}>
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
        </Row>

        <Row style={{ marginTop: 50 }}>
          <Container>
            <h2 className="title-header">Rating</h2>
            <Row>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Row>
          </Container>
        </Row>
        <Row
          style={{
            marginTop: 20,
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setNationFilter(selectedValue);
              setMinFilter(minVal);
              setMaxFilter(maxVal);
              setRating(value);
            }}
          >
            {" "}
            Filter
          </Button>
        </Row>
      </Container>
    </body>
  );
};

export default FilterSidebar;

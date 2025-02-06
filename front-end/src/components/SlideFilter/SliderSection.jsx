import React from "react";
import SliderInput from "./SliderInput";
// import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import RefineIcon from "../Image/refine_icon.png";

const SliderSection = ({
  minVal,
  maxVal,
  min,
  max,
  range,
  minValRef,
  maxValRef,
  setMaxVal,
  setMinVal,
}) => {
  return (
    <>
      <Row>
        {" "}
        <Col md={9}>
          {" "}
          <h2 className="title-header">Visitor:</h2>
        </Col>
        <Col md={3}>
          <img src={RefineIcon} style={{ width: 40 }}></img>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <SliderInput
          min={min}
          max={max}
          onChange={({ min, max }) => console.log(`1`)}
          minVal={minVal}
          maxVal={maxVal}
          setMaxVal={setMaxVal}
          setMinVal={setMinVal}
          minValRef={minValRef}
          maxValRef={maxValRef}
          range={range}
        />
      </Row>
    </>
  );
};

export default SliderSection;

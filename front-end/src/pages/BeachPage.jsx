import "../Css/BeachPage.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import BeachList from "../components/BeachList/BeachList";
import Navbar from "../components/Navbar/Navbar";
import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import BeachSide from "../components/BeachSide/BeachSide";
import { useStateContext } from "../Context/ContextProvider";
const BeachPage = () => {
  const { user, token } = useStateContext();
  // state for beachside
  const [beach, setBeach] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const beachResponse = await axios.get(
          "http://127.0.0.1:8000/api/beachjoin"
        );
        if (beachResponse) {
          const result = beachResponse.data.filter(
            (item) => item.ratingScore >= 4.5
          );
          setFilter(result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(filter);
  //state for star rating
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000000);

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  // simple
  const [nation, setNation] = useState([]);
  const [value, setValue] = useState(2);
  const [option, setOption] = useState("");
  //filter event

  const [nationFilter, setNationFilter] = useState("");
  const [minFilter, setMinFilter] = useState("");
  const [maxFilter, setMaxFilter] = useState("");
  const [rating, setRating] = useState("");
  const [loading, _setLoading] = useState(false);

  const [result, setResult] = useState({});

  const setLoading = (value) => {
    _setLoading(value);
  };

  console.log(token, user);
  return (
    <>
      <Navbar />
      {token ? <h1>Welcome {token}</h1> : <h1>Welcome Guest</h1>}
      <Container
        fluid
        className="p-40"
        style={{
          background:
            "linear-gradient(to left bottom, rgb(255, 228, 230), rgb(204, 251, 241))",
          marginTop: 5,
        }}
      >
        <Row className="custom-row">
          <Col md={3}>
            <FilterSidebar
              setLoading={setLoading}
              setNation={setNation}
              setValue={setValue}
              value={value}
              nation={nation}
              option={option}
              minVal={minVal}
              maxVal={maxVal}
              setMaxVal={setMaxVal}
              setMinVal={setMinVal}
              minValRef={minValRef}
              maxValRef={maxValRef}
              range={range}
              min={min}
              max={max}
              handleChange={handleChange}
              selectedValue={selectedValue}
              setNationFilter={setNationFilter}
              setMaxFilter={setMaxFilter}
              setMinFilter={setMinFilter}
              setRating={setRating}
            />

            <BeachSide filter={filter} title={"Top rating beach"} />
          </Col>

          <Col md={9}>
            {" "}
            <BeachList
              nationFilter={nationFilter}
              minFilter={minFilter}
              maxFilter={maxFilter}
              rating={rating}
              setNationFilter={setNationFilter}
              setMaxFilter={setMaxFilter}
              setMinFilter={setMinFilter}
              setRating={setRating}
            />
          </Col>
        </Row>
      </Container>
      <div class="copyright">
        <p>Copyrights By Teams 2 - 2024</p>
      </div>
    </>
  );
};
export default BeachPage;

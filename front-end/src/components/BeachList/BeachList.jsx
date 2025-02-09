import { useState, useEffect } from "react";
import "./BeachList.css";
import Card from "../BeachCard/BeachCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import axios from "axios";
import paginate from "./pagination";

const BeachList = ({
  nationFilter,
  minFilter,
  maxFilter,
  rating,
  setNationFilter,
  setMaxFilter,
  setMinFilter,
  setRating,
}) => {
  const [beach, setBeach] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [beaches, setBeaches] = useState([]);
  const [continents, setContinents] = useState([]);
  const [continentBtn, setContinentBtn] = useState("All");
  const [keyword, setKeyword] = useState("");

  const fetchContinent = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/continent");
      setContinents(res.data);
    } catch (error) {
      console.error("Error fetching continent data:", error);
    }
  };

  const fetchBeach = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/beach");
      setBeach(paginate(res.data));
    } catch (error) {
      console.error("Error fetching beach data:", error);
    } finally {
      setLoading(false);
    }
  };

  const multiFilter = async (nat, min, max, rat) => {
    setLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/beachjoin");
      const filtered = res.data.filter((item) => {
        return (
          item.nation_name === nat &&
          item.visitor >= Number(min) &&
          item.visitor <= Number(max) &&
          item.ratingScore >= Number(rat)
        );
      });
      setBeach(paginate(filtered));
    } catch (error) {
      console.error("Error fetching beach data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilterContinent = async (value) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/continent/${value}`
      );
      setBeach(paginate(res.data));
    } catch (error) {
      console.error(`Error fetching beaches for continent ${value}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const searchBeach = async (key) => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/beachjoin");
      const filtered = res.data.filter((item) =>
        item.name.toLowerCase().includes(key.toLowerCase())
      );
      setBeach(paginate(filtered));
    } catch (error) {
      console.error("Error searching for beaches:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchContinent();
  }, []);

  useEffect(() => {
    if (nationFilter || minFilter || maxFilter || rating) {
      setContinentBtn(""); // Reset continentBtn when filters are applied
      multiFilter(nationFilter, minFilter, maxFilter, rating);
    } else if (continentBtn === "All") {
      setPage(0);
      fetchBeach();
    } else if (continentBtn) {
      setPage(0);
      fetchFilterContinent(continentBtn);
    }
  }, [continentBtn, nationFilter, minFilter, maxFilter, rating]);

  useEffect(() => {
    if (!loading) {
      setBeaches(beach[page] || []);
    }
  }, [page, beach, loading]);

  useEffect(() => {
    if (keyword) {
      setNationFilter("");
      setMinFilter("");
      setMaxFilter("");
      setRating("");

      searchBeach(keyword);
    } else if (continentBtn === "All") {
      fetchBeach();
    }
  }, [keyword]);

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > beach.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };

  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = beach.length - 1;
      }
      return prevPage;
    });
  };

  const handlePage = (index) => {
    setPage(index);
  };

  const handleContinentClick = (value) => {
    setContinentBtn(value);
    setNationFilter("");
    setMinFilter("");
    setMaxFilter("");
    setRating("");
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      {loading ? (
        <p
          style={{
            fontSize: 50,
            color: " #007bff",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          ...Loading
        </p>
      ) : (
        <main style={{ width: 1200 }}>
          <Row>
            <div className="container mt-3">
              <div className="btn-group" style={{ marginLeft: 20 }}>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => handleContinentClick("All")}
                >
                  All
                </button>
                {continents.map((item) => {
                  return (
                    <ButtonGroup
                      key={item.id}
                      {...item}
                      setContinentBtn={handleContinentClick}
                    />
                  );
                })}
              </div>
              <form style={{ float: "right", width: "400px" }}>
                <input
                  type="text"
                  placeholder="Search beach..."
                  value={keyword}
                  onChange={handleSearchChange}
                ></input>
              </form>
            </div>
          </Row>
          <div
            className="container_next_page"
            style={{ border: "none", width: 1200, padding: "20px 20px" }}
          >
            <Container style={{ textAlign: "center" }}>
              <Row xs={{ cols: 3 }}>
                {beaches.map((item) => (
                  <Col key={item.id}>
                    <Card {...item} />
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
          {!loading && (
            <div
              className="btn-container"
              style={{ order: 4, flex: "1 0 100%" }}
            >
              <button
                className="prev-btn"
                onClick={prevPage}
                style={{ borderRadius: "20px", width: "50px" }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              {beach.map((item, index) => (
                <button
                  key={index}
                  className={`page-btn ${index === page ? "active-btn" : null}`}
                  onClick={() => handlePage(index)}
                  style={{
                    margin: "15px 15px",
                    borderRadius: "40px",
                    width: "50px",
                  }}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="next-btn"
                onClick={nextPage}
                style={{ borderRadius: "20px", width: "50px" }}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default BeachList;

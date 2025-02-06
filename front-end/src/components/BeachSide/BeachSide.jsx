import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import "../BeachSide/BeachSide.css";
import Rating from "@mui/material/Rating";
import { Link, useParams } from "react-router-dom";

const BeachSide = ({ id, title, filter }) => {
  const [relatedBeaches, setRelatedBeaches] = useState([]);
  const [nationid, setNationId] = useState(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const beachResponse = await axios.get(
          `http://127.0.0.1:8000/api/beach/${id}`
        );
        const imgResponse = await axios.get(
          `http://127.0.0.1:8000/api/beachimg/${id}`
        );
        const beachJoinResponse = await axios.get(
          "http://127.0.0.1:8000/api/beachjoin"
        );

        if (beachResponse) {
          setNationId(beachResponse.data.nationid);
          const relatedBeachesResponse = await axios.get(
            `http://127.0.0.1:8000/api/beachbynation/${nationid}`
          );
          console.log(relatedBeachesResponse.data);
          setRelatedBeaches(relatedBeachesResponse.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  console.log(filter);
  return (
    <>
      <Col
        className="slide-beach"
        style={{
          boxShadow: "10px 8px 16px 10px rgba(0, 0, 0, 0.25)",
          backgroundColor: "gba(0, 191, 255, 1)",
          borderRadius: 10,
        }}
      >
        <Container>
          {" "}
          <h2 style={{ marginTop: 30 }}>{title}</h2>
        </Container>
        <div
          style={{
            paddingLeft: 20,

            marginTop: 10,
            height: 500,
            overflow: "scroll",
            paddingTop: 30,
          }}
        >
          {filter
            ? filter.map((item) => (
                <Link to={`/beach/${item.id}`}>
                  <div className="side-item" key={item.id}>
                    <Row
                      style={{
                        border: "1px solid #808080",

                        width: "100%",
                        borderRadius: 5,
                        marginTop: 10,
                        backgroundColor: "white",
                        padding: "10px 0px",
                      }}
                    >
                      <Col className="image-col" md={4}>
                        <img src={item.avartar_url} alt={item.name} />{" "}
                      </Col>
                      <Col md={8}>
                        <h5>{item.name}</h5>
                        <p>
                          <b>Visitor:</b> {item.visitor}
                        </p>
                        <Rating
                          name="half-rating-read"
                          defaultValue={item.ratingScore}
                          precision={0.5}
                          readOnly
                        />
                      </Col>
                    </Row>
                  </div>
                </Link>
              ))
            : relatedBeaches.map((item) => (
                <Link to={`/beach/${item.id}`}>
                  <div className="side-item" key={item.id}>
                    <Row
                      style={{
                        border: "1px solid #808080",

                        width: "100%",
                        borderRadius: 5,
                        marginTop: 10,
                        backgroundColor: "white",
                        padding: "10px 0px",
                      }}
                    >
                      <Col className="image-col" md={4}>
                        <img src={item.avartar_url} alt={item.name} />{" "}
                      </Col>
                      <Col md={8}>
                        <h5>{item.name}</h5>
                        <p>
                          <b>Visitor:</b> {item.visitor}
                        </p>
                        <Rating
                          name="half-rating-read"
                          defaultValue={item.ratingScore}
                          precision={0.5}
                          readOnly
                        />
                      </Col>
                    </Row>
                  </div>
                </Link>
              ))}
        </div>
      </Col>
    </>
  );
};

export default BeachSide;

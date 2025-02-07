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
      <Col className="slide-beach bg-blue-500 shadow-lg rounded-lg p-4">
        <Container>
          <h2 className="mt-8 text-white text-2xl font-bold">{title}</h2>
        </Container>
        <div className="overflow-y-scroll h-[calc(100vh-200px)] mt-4">
          {filter
            ? filter.map((item) => (
                <Link to={`/beach/${item.id}`} key={item.id}>
                  <div className="side-item mb-4 p-4 bg-white rounded-lg shadow-md">
                    <Row className="border border-gray-300 rounded-lg p-2">
                      <Col className="image-col" md={4}>
                        <img
                          src={item.avartar_url}
                          alt={item.name}
                          className="w-full h-auto rounded-lg"
                        />
                      </Col>
                      <Col md={8}>
                        <h5 className="text-lg font-semibold">{item.name}</h5>
                        <p className="text-gray-600">
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
                <Link to={`/beach/${item.id}`} key={item.id}>
                  <div className="side-item mb-4 p-4 bg-white rounded-lg shadow-md">
                    <Row className="border border-gray-300 rounded-lg p-2">
                      <Col className="image-col" md={4}>
                        <img
                          src={item.avartar_url}
                          alt={item.name}
                          className="w-full h-auto rounded-lg"
                        />
                      </Col>
                      <Col md={8}>
                        <h5 className="text-lg font-semibold">{item.name}</h5>
                        <p className="text-gray-600">
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

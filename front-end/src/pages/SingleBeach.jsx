import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Navbar from "../components/Navbar/Navbar";
import Carousel from "react-bootstrap/Carousel";
import TabSection from "../components/TabSection/TabSection";
import { Rating } from "@mui/material";
import BeachSide from "../components/BeachSide/BeachSide";
import { useStateContext } from "../Context/ContextProvider";
const SingleBeach = () => {
  const { id } = useParams();
  const [singleBeach, setSingleBeach] = useState({});
  const [imgLibra, setImgLibra] = useState([]);
  const [beach, setBeach] = useState([]);
  const { role } = useStateContext();
  const [loading, setLoading] = useState(true);
  const [redirectToAdmin, setRedirectToAdmin] = useState(false);
  useEffect(() => {
    if (role === "admin") {
      console.log("Role cuả tao nè: " + role);
      setRedirectToAdmin(true);
    }

    console.log("Role page: " + role);
    setLoading(true);
    fetchSingleBeach();
    fetchBeachImages();
    fetchBeachJoinData();
    if (singleBeach && imgLibra && beach) {
      setLoading(false);
    }
  }, [id, role]);

  const fetchSingleBeach = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/beach/${id}`);
      setSingleBeach(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching single beach data:", error);
    }
  };

  const fetchBeachImages = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/beachimg/${id}`);
      setImgLibra(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching beach images:", error);
    }
  };

  const fetchBeachJoinData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/beachjoin");
      setBeach(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching beach join data:", error);
    }
  };

  if (redirectToAdmin) {
    return <Navigate to="/admin" />;
  }

  return (
    <>
      <Navbar />
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
        <Row>
          <Col md={3}>
            <BeachSide
              id={id}
              beach={beach}
              title={"Relative beach in this nation"}
            />
          </Col>
          <Col md={8}>
            <Row
              style={{
                marginTop: 20,
                border: "1px solid black",
                backgroundColor: "white",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                borderRadius: 10,
                transition: "0.3s",
                width: "100%",
                height: 500,
              }}
            >
              <Col className="left-col" md={5} style={{ marginTop: 10 }}>
                <img src={singleBeach.avartar_url}></img>
              </Col>
              <Col className="right-col" md={7}>
                <h2 style={{ color: "black" }}>{singleBeach.name}</h2>
                <p style={{ color: "black" }}>{singleBeach.description}</p>
                <Rating
                  name="half-rating-read"
                  defaultValue={4.5}
                  precision={0.5}
                  readOnly
                />
                <h2>View position on Google map:</h2>
                <iframe
                  src={singleBeach.map_html_code}
                  style={{ height: 250 }}
                ></iframe>
              </Col>
            </Row>
            <Row>
              <h1>Slide Image</h1>
            </Row>
            <Row>
              {" "}
              <Carousel>
                {imgLibra.map((item) => {
                  return (
                    <Carousel.Item>
                      <img src={item.img_url} style={{ height: 600 }} />
                      <Carousel.Caption>
                        <h3>{item.caption}</h3>
                        <p>
                          Nulla vitae elit libero, a pharetra augue mollis
                          interdum.
                        </p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </Row>

            <Row className="tabs-section" style={{ marginTop: 20 }}>
              <TabSection id={id} />
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default SingleBeach;

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
        <p className="text-4xl text-blue-500 text-center mt-5">...Loading</p>
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
            <Row className="mt-5 border border-black bg-white shadow-lg rounded-lg transition duration-300 w-full h-128">
              <Col className="left-col" md={5} style={{ marginTop: 10 }}>
                <img
                  src={singleBeach.avartar_url}
                  className="w-full h-auto rounded-lg"
                  alt="Beach Avatar"
                />
              </Col>
              <Col className="right-col" md={7}>
                <h2 className="text-black text-2xl font-bold">
                  {singleBeach.name}
                </h2>
                <p className="text-black">{singleBeach.description}</p>
                <Rating
                  name="half-rating-read"
                  defaultValue={4.5}
                  precision={0.5}
                  readOnly
                />
                <h2 className="mt-4">View position on Google map:</h2>
                <iframe
                  src={singleBeach.map_html_code}
                  className="w-full h-64 mt-2 rounded-lg"
                  title="Google Map"
                ></iframe>
              </Col>
            </Row>
            <Row>
              <h1 className="text-3xl font-bold mt-5 text-center text-gray-800">
                Slide Image
              </h1>
            </Row>
            <Row>
              <Carousel className="w-full mt-5">
                {imgLibra.map((item) => (
                  <Carousel.Item key={item.img_url}>
                    <img
                      src={item.img_url}
                      className="w-full h-96 object-cover rounded-lg shadow-lg"
                      alt="Beach"
                    />
                    <Carousel.Caption className="bg-black bg-opacity-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white">
                        {item.caption}
                      </h3>
                      <p className="text-sm text-gray-300">
                        Nulla vitae elit libero, a pharetra augue mollis
                        interdum.
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Row>
            <Row className="tabs-section mt-5">
              <TabSection id={id} />
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default SingleBeach;

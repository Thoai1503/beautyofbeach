import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const Feed = ({
  image,
  comment,
  ratingScore,
  createdAt,
  accountid,
  imageC,
}) => {
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const fetchUser = async () => {
    try {
      axios.get(`http://127.0.0.1:8000/api/user/${accountid}`).then((res) => {
        setImg(res.data.user.image_url);
        setName(res.data.user.name);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md">
      <img
        src={img}
        alt={`${name}'s avatar`}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <div className="flex items-center space-x-2">
          <h4 className="text-lg font-semibold">{name}</h4>
          <span className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleString()}
          </span>
        </div>
        <Rating name="read-only" value={4.5} precision={0.5} readOnly />

        <div className="mt-2">
          <p className="mt-2 text-gray-700">{comment}</p>
        </div>
        {imageC && (
          <img
            src={imageC}
            alt="Committed Image"
            className="w-25 h-18 object-cover mt-4"
            onClick={handleShowModal}
          />
        )}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Image Preview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={imageC} alt="Committed Image" className="w-full h-auto" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Feed;

import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import axios from "axios";

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
    <div className="relative bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="absolute top-2 right-2 text-gray-500 text-sm">
        {new Date(createdAt).toLocaleString()}
      </div>
      <div className="flex items-center">
        <img
          src={img}
          alt="Avatar"
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <Rating name="read-only" value={4.5} precision={0.5} readOnly />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700">{comment}</p>

        <img
          src={imageC}
          alt="Committed Image"
          className="w-25 h-18  object-cover mt-4"
        />
      </div>
    </div>
  );
};

export default Feed;

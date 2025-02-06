import { Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CommentFeed = ({ comment, accountid, createdAt }) => {
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
        <p className="mt-2 text-gray-700">{comment}</p>
      </div>
    </div>
  );
};

export default CommentFeed;

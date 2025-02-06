import React from "react";
import { Rating } from "@mui/material";

const Feed = ({ image, comment, ratingScore, createdAt }) => {
  return (
    <div className="relative bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="absolute top-2 right-2 text-gray-500 text-sm">
        {new Date(createdAt).toLocaleString()}
      </div>
      <div className="flex items-center">
        <img
          src={image}
          alt="Review"
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <Rating name="read-only" value={4.5} precision={0.5} readOnly />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700">{comment}</p>
      </div>
    </div>
  );
};

export default Feed;

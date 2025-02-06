import React from "react";
import "../BeachCard/BeachCard.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

const Card = ({ avartar_url, name, visitor, ratingScore, id }) => {
  return (
    <div
      className="card"
      style={{
        borderRadius: 15,
        // width: "300px",
        height: 420,

        width: 360,
        // marginLeft: 15,
        marginTop: 30,
      }}
    >
      <img
        src={avartar_url}
        alt=""
        style={{ borderRadius: 15, width: "100%", height: 230 }}
      />
      <div className="container">
        <h3 style={{ color: "Black" }}>
          <i>
            <b>{name}</b>
          </i>
        </h3>
        <p style={{ color: "black" }}>Visitor: {visitor} </p>
        <Rating
          name="half-rating-read"
          defaultValue={ratingScore}
          precision={0.5}
          readOnly
        />
        <div className="btn-button1">
          <Link to={`/beach/${id}`}>
            <button className="button button1" style={{ marginTop: 20 }}>
              View more detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;

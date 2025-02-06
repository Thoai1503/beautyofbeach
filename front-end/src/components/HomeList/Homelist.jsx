import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../HomeList/HomeList.css";
import axios from "axios";
const Homelist = () => {
  const [beaches, setBeaches] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/home").then((r) => setBeaches(r.data));
  }, []);
  console.log(beaches);
  return (
    <>
      {beaches.map((item) => (
        <div className="main-button">
          <button className="main">
            <ul className="items-content">
              <li className="menu-contents">
                <img
                  src={item.avartar_url}
                  alt=""
                  style={{
                    borderRadius: "20px",
                    width: "100%",
                    height: "280px",
                    backgroundSize: "cover",
                  }}
                  className="img"
                />
              </li>
              {/* <li className="menu-contents">
                
              </li> */}
              <li className="menu-contents">
                <div className="container">
                  <h2 style={{ color: "black" }}>
                    <i>
                      <b>{item.name}</b>
                    </i>
                  </h2>
                  <p style={{ color: "black", textAlign: "center" }}>
                    Visitor: {item.visitor}{" "}
                  </p>
                  <Link to={`/beach/${item.id}`}>
                    <button className="button button1">View more detail</button>
                  </Link>
                </div>
              </li>
            </ul>
          </button>
        </div>
      ))}
      <br />
    </>
  );
};

export default Homelist;

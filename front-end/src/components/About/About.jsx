import { Link } from "react-router-dom";
import "../About/About.css";
import Image1 from "../Image/hau.png";
import Image2 from "../Image/thien.png";
import Image3 from "../Image/thoai.png";
import Image4 from "../Image/long.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarked,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
const About = () => {
  const form_contact = useRef();
  const sendEmailControll = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_d3uct44", "template_7hs9i7o", form_contact.current, {
        publicKey: "m_s_RQqh0HNtmCtlX",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
    alert("Wow! You Send Done ^_^");
  };
  return (
    <>
      <div
        className="imghead"
        style={{ position: "relative", textAlign: "center" }}
      >
        <img
          id="img_about"
          src="https://images.pexels.com/photos/1452701/pexels-photo-1452701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Beach"
          style={{ width: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            top: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#F5F5F5",
            padding: "15px",
            width: "80%",
            maxWidth: "1300px",
            textAlign: "center",
            overflow: "hidden",
            fontSize: "65px",
            lineHeight: "1.2",
            fontFamily: '"Sevillana", cursive',
          }}
        >
          <p>
            Are you struggling to choose the perfect beach for your next
            vacation? Welcome to Web{" "}
            <span
              style={{ fontWeight: "bold", color: "#0033FF", textShadow: "" }}
            >
              BeautyOfBeaches
            </span>
            , where we will introduce you to the most beautiful beaches across
            the continents. Explore and choose the ideal destination for your
            trip
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            justifyContent: "center",
            alignItems: "center",
            paddingTop: "250px",
          }}
        >
          <Link to="/beach" style={{ textDecoration: "none" }}>
            <button className="btnhead" style={{ fontSize: "20px" }}>
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="css-i6dzq1"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>{" "}
              Explore Now
            </button>
          </Link>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "10%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "20px",
          }}
        >
          <p
            style={{
              margin: "0",
              fontSize: "18px",
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
              flex: "1",
              backgroundColor: "rgba(0, 0, 0, 0)",
              letterSpacing: "3.3px",
              color: "#FFFFFF",
            }}
          >
            More than 30 beautiful beaches spanning across continents
          </p>
          <p
            style={{
              margin: "0",
              fontSize: "18px",
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
              flex: "1",
              borderLeft: "2px solid white",
              backgroundColor: "rgba(0, 0, 0, 0)",
              letterSpacing: "4.5px",
              color: "#FFFFFF",
            }}
          >
            Continuous and accurate updates of activities
          </p>
          <p
            style={{
              margin: "0",
              fontSize: "18px",
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
              flex: "1",
              borderLeft: "2px solid white",
              backgroundColor: "rgba(0, 0, 0, 0)",
              letterSpacing: "5px",
              color: "#FFFFFF",
            }}
          >
            Accurate and impartial reviews of beach services
          </p>
          <p
            style={{
              margin: "0",
              fontSize: "18px",
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
              flex: "1",
              padding: "0 10px",
              borderLeft: "2px solid white",
              backgroundColor: "rgba(0, 0, 0, 0)",
              letterSpacing: "6.5px",
              color: "#FFFFFF",
            }}
          >
            Delivering great customer experiences
          </p>
        </div>
      </div>
      <div>
        <div
          style={{
            float: "left",
          }}
        >
          <p
            style={{
              position: "absolute",
              color: "black",
              maxWidth: "1000px",
              textAlign: "center",
              overflow: "hidden",
              fontSize: "33px",
              lineHeight: "1.4",
              fontFamily: '"Sevillana", cursive',
              padding: "50px",
              paddingLeft: "50px",
            }}
          >
            The beach is a natural paradise, where fine white sand stretches
            underfoot, and the gentle sound of waves creates a soothing melody
            from the ocean. The clear blue water, reflecting the sparkling
            sunlight, presents an irresistible breathtaking scene. The air here
            is fresh, carrying the salty essence of the sea, which refreshes the
            soul. You can relax on long chairs, savor a fresh coconut drink, and
            watch the brilliant sunset as the sun slowly sinks into the sea. All
            these experiences not only bring you absolute relaxation but also
            awaken the desire to explore and experience the magnificent beauty
            of the beach. Pack your bags and hit the road, for the beach awaits
            you with unforgettable wonders.
          </p>
        </div>
        <video width={800} controls autoPlay loop muted className="videohead">
          <source
            src="https://media.istockphoto.com/id/1351019461/vi/video/ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-ch%E1%BA%A1y-ra-bi%E1%BB%83n-d%C6%B0%E1%BB%9Bi-g%E1%BB%91c-c%C3%A2y-c%E1%BB%8D-%E1%BB%9F-maldives.mp4?s=mp4-640x640-is&k=20&c=S_CX5CeU1B1uP7t9qXPYNYLleiKCQlHCUlueZuU-S-g="
            type="video/mp4"
          />
        </video>
      </div>
      <div className="container" style={{ clear: "both" }}>
        <div>
          <h1 className="textintroduce">Founder members</h1>
        </div>
        <div className="hau one-div">
          <img
            src="https://images.pexels.com/photos/63340/pexels-photo-63340.jpeg"
            alt=""
            style={{ width: "1500px", height: "500px", filter: "blur(1.5px)" }}
          />
          <img
            src={Image1}
            alt=""
            className="overlay-image"
            style={{
              filter: "blur(0.5px)",
            }}
          />
          <p className="texthau text">
            <h1
              style={{ textAlign: "center", color: "white" }}
              className="hauh1"
            >
              Hau Huynh
            </h1>
            <p
              style={{
                fontSize: "18px",
                textAlign: "left",
                letterSpacing: "1px",
              }}
            >
              We would like to introduce our student Huynh Hau from Aptech
              Training Center. Currently, Huynh Hau is working on an important
              project in the training program, focusing on Object Sem 1. With
              his passion and tireless efforts, Huynh Hau has been able to
              create and solidify his professional skills through each step of
              project development. This project not only reflects the light of
              questions and knowledge application but also demonstrates the
              dedication and progressive spirit of the student.
            </p>
          </p>
        </div>

        <div className="hau one-div">
          <img
            src="https://images.pexels.com/photos/3601463/pexels-photo-3601463.jpeg"
            alt=""
            style={{ width: "1500px", height: "500px", filter: "blur(1.5px)" }}
          />
          <img
            src={Image3}
            alt=""
            className="overlay-image"
            style={{
              filter: "blur(0.5px)",
              width: "650px",
              height: "480px",
              top: "30px",
              left: "620px",
            }}
          />
          <p className="texthau text">
            <h1
              style={{
                textAlign: "center",
                fontSize: "91px",
                color: "#BBBBBB",
              }}
              className="hauh1"
            >
              Thoai Vo Giang
            </h1>
            <p
              style={{
                fontSize: "19px",
                textAlign: "left",
                letterSpacing: "1px",
              }}
            >
              We would like to introduce student Thoai Vo Giang, one of the
              typical faces at Aptech Training Center. Currently, Student12315
              is doing his graduation project with the topic Object Sem 1. With
              his tireless efforts and high sense of responsibility, Thoai Vo
              Giang has been effectively applying the knowledge and skills he
              has learned into the project. This project not only demonstrates
              his deep understanding but also proves his creativity and
              innovative thinking. We are looking forward to the impressive
              results from this project.
            </p>
          </p>
        </div>
      </div>
      <div
        className="container imagebetween "
        style={{
          clear: "both",
          marginTop: "40px",
        }}
      >
        <div class="card1">
          <p>
            <span>
              <img
                src="https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg"
                alt=""
              />
            </span>
          </p>
          <p>
            <span>
              <img
                src="https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </span>
          </p>
          <p>
            <span>
              <img
                src="https://images.pexels.com/photos/457881/pexels-photo-457881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </span>
          </p>
          <p>
            <span>
              <img
                src="https://images.pexels.com/photos/1456291/pexels-photo-1456291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </span>
          </p>
          <p>
            <span>
              <img
                src="https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </span>
          </p>
          <p>
            <span>
              <img
                src="https://images.pexels.com/photos/635279/pexels-photo-635279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </span>
          </p>
          <p>
            <span>
              <img
                src="https://images.pexels.com/photos/96377/pexels-photo-96377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </span>
          </p>
          <p>
            <span>
              <img
                src="https://images.pexels.com/photos/1838556/pexels-photo-1838556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </span>
          </p>
        </div>
      </div>
      <div className="sections-6">
        <section className="container-6">
          <div className="heading white">
            <h2>Questions And feedback</h2>
            <p>Ask US Questions And Give Feedback</p>
          </div>
          <div className="content">
            <div className="contactInfo">
              <h3>Contact Info</h3>
              <div className="contactInfoBx">
                <div className="box">
                  <div className="icon">
                    <FontAwesomeIcon icon={faMapMarked} />
                  </div>
                  <div className="text">
                    <h3>Address</h3>
                    <p>778/10 Nguyễn Kiệm, Q. Phú Nhuận</p>
                  </div>
                </div>
                <div className="box">
                  <div className="icon">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div className="text">
                    <h3>Phone</h3>
                    <p>1800 28 28 24 </p>
                  </div>
                </div>
                <div className="box">
                  <div className="icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div className="text">
                    <h3>Email</h3>
                    <p>aptech2@aprotrain.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="formBx">
              <form ref={form_contact} onSubmit={sendEmailControll}>
                <h3>Message Me</h3>
                <input type="text" name="user_name" placeholder="Full Name" />
                <input type="email" placeholder="Email" name="user_email" />
                <textarea name="message" placeholder="Your Message"></textarea>
                <input type="submit" name="submit" value="Send" />
              </form>
            </div>
          </div>
        </section>
      </div>
      <div class="copyright">
        <p>Copyrights By Teams 2 - 2024</p>
      </div>
    </>
  );
};

export default About;

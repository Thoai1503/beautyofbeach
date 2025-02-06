import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "../Section/Section.css";
import Homelist from "../HomeList/Homelist";
import SlideHome from "../SlideHome/Slidehome";
import { faMapMarked, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import emailjs from '@emailjs/browser';
const Section = () => {
    const form_contact = useRef();
    const sendEmailControll = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_d3uct44', 'template_7hs9i7o', form_contact.current, {
                publicKey: 'm_s_RQqh0HNtmCtlX',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
            alert("Wow! You Send Done ^_^");
    };
    return (
        <body>
            <div className="background_home">
                <div className="sections sections-1">
                    <section className="container">
                        <div className="content-contents">
                            <h2 className="text text_1">The most beautiful beaches in the world</h2>
                            <p className="text text_2">We bring you references, choices of
                                the most beautiful beaches in the world.</p>
                            <div className="btn">
                                <Link to="/beach">
                                    <button className="btn-1">See More</button>
                                </Link>
                                <Link to="/contact">
                                    <button className="btn-2">Contact with us to get more detailed information</button>
                                </Link>
                            </div>
                        </div>
                        <div className="Images-section">
                            <img className="homepic" src="./Images/beacheshome.jpg" />
                        </div>
                    </section>
                </div>
                <div className="sections sections-5">
                    <section className="container-5">
                        <div className="border-btn">
                            <ul className="main-btn">
                                <li className="main-button-icons">
                                    <button className="menu-border">
                                        <img src="./Icons/beach.png" alt="" />
                                        <p className="text_btn">Top of stunning beaches in the continents</p>
                                    </button>
                                </li>
                                <li className="main-button-icons">
                                    <button className="menu-border">
                                        <img src="./Icons/address.png" alt="" />
                                        <p className="text_btn">30 + destinations around the world</p>
                                    </button>
                                </li>
                                <li className="main-button-icons">
                                    <button className="menu-border">
                                        <img src="./Icons/Tourists.png" alt="" />
                                        <p className="text_btn_m">1.000.000 million visitors...
                                            <FontAwesomeIcon icon={faUser} />
                                        </p>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
                <div className="sections sections-4">
                    <section className="container-4">
                        <div className="ab">
                            <SlideHome className="slide_Home" />
                        </div>
                    </section>
                </div>
                <div className="sections sections-2">
                    <section className="container-2">
                        <div className="top">
                            <h3 className="beachTop">Top Beach Ratings</h3>

                        </div>
                        <div className="cardHome">
                            <Homelist />
                        </div>
                    </section>
                </div>
                <div className="sections-6">
                    <section className="container-6">
                        <div className="heading white">
                            <h2>Questions and Feedback</h2>
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
                                            <p>778/10 Nguyen Kiem St, Phu Nhuan District</p>
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
                                <form ref={form_contact} onSubmit={sendEmailControll} >
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

            </div>
        </body>
    );
}

export default Section;

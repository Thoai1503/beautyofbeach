import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../SlideHome/Slidehome.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const SlideHome = () => {
    const sliderRef = React.useRef(null);
    const settings = {
        dots: true,
        infinite: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1100,
        pauseOnHover: true
    };

    return (
        <div className="slider-container">
            <button className="prev-button" onClick={() => sliderRef.current.slickPrev()}>
                <FontAwesomeIcon icon={faArrowLeft}/>
            </button>
            <button className="next-button" onClick={() => sliderRef.current.slickNext()}>
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <Slider ref={sliderRef} {...settings}>
                <div>
                    <img src="./Images/slide1.jpg" alt="Image 1" />

                </div>
                <div>
                    <img src="./Images/slide2.jpg" alt="Image 2" />
                </div>
                <div>
                    <img src="./Images/slide3.jpg" alt="Image 3" />
                </div>
                <div>
                    <img src="./Images/slide4.jpg" alt="Image 4" />
                </div>
                <div>
                    <img src="./Images/slide5.jpg" alt="Image 5" />
                </div>
            </Slider>
        </div>
    );
};

export default SlideHome;
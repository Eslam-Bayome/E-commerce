import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function SimpleSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  return (
    <>
      <Slider {...settings}>
        <div>
          <img
            style={{ height: "300px" }}
            src={require("../../images/slider-image-1.jpeg")}
            className="w-100"
            alt=""
          />
        </div>
        <div>
          <img
            style={{ height: "300px" }}
            src={require("../../images/slider-image-2.jpeg")}
            className="w-100"
            alt=""
          />
        </div>
        <div>
          <img
            style={{ height: "300px" }}
            src={require("../../images/slider-image-3.jpeg")}
            className="w-100"
            alt=""
          />
        </div>
        <div>
          <img
            style={{ height: "300px" }}
            src={require("../../images/slider-2.jpeg")}
            className="w-100"
            alt=""
          />
        </div>
      </Slider>
    </>
  );
}

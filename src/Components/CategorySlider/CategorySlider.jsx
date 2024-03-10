import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";

export default function CategorySlider() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data } = useQuery("getCategories", getCategories);

  let settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 7,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 5,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {data?.data.data.map((cate, idx) => {
          return (
            <>
              <div key={idx}>
                <div>
                  <img
                    style={{ height: "160px" }}
                    src={cate.image}
                    className="w-100"
                    alt={cate.name}
                  />
                </div>
                <p className="text-center  fw-semibold">{cate.name}</p>
              </div>
            </>
          );
        })}
      </Slider>
    </>
  );
}

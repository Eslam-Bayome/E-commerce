import React from "react";
import SimpleSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import Products from "../Products/Products";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="row gx-0 gy-md-0 gy-4">
          <div className="col-md-9">
            <SimpleSlider />
          </div>
          <div className="col-md-3 ">
            <div className="row g-0 ">
              <div className=" col-md-12 col-6">
                <img
                  src={require("../../images/grocery-banner.png")}
                  className="w-100 "
                  style={{ height: "150px" }}
                  alt=""
                />
              </div>
              <div className=" col-md-12 col-6">
                <img
                  style={{ height: "150px" }}
                  src={require("../../images/grocery-banner-2.jpeg")}
                  className="w-100"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 my-5">
          <CategorySlider />
        </div>
        <Products />
      </div>
      <Helmet>
        <title>FreshCart</title>
      </Helmet>
    </>
  );
}

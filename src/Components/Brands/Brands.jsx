import React, { useState } from "react";
import axios from "axios";
// import { Helmet } from "react-helmet";
import LodaingScreen from "./../LoadingScreen/LodaingScreen";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

export default function Brands() {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { isLoading, data } = useQuery("getAllBrands", getBrands, {
    refetchOnMount: false,
  });

  if (isLoading) return <LodaingScreen />;

  return (
    <>
      <Helmet>
        <title> Brands</title>
      </Helmet>
      <div className="container">
        <div className="row text-center">
          <>
            {data.data.data?.map((brand, index) => (
              <div key={index} className="col-md-3 cursor-pointer">
                <img src={brand.image} alt="" className="w-100" />
                <h5 className="text-main">{brand.name}</h5>
              </div>
            ))}
          </>
        </div>
      </div>
    </>
  );
}

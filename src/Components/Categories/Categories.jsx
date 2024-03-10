import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
// import { Helmet } from "react-helmet";
import LodaingScreen from "./../LoadingScreen/LodaingScreen";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

export default function Categories() {
  function getCate() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { isLoading, data } = useQuery("allCategories", getCate);

  if (isLoading) return <LodaingScreen />;
  return (
    <>
      <Helmet>
        <title> Categories</title>
      </Helmet>
      <div className="container my-4 bg-light">
        <div className="row text-center">
          <>
            {data.data.data?.map((categorie, index) => (
              <div key={index} className="col-md-4 p-3 cursor-pointer">
                <img
                  src={categorie.image}
                  style={{ height: "400px" }}
                  alt={categorie.name}
                  className="w-100"
                />
                <h5 className="text-main pt-3">{categorie.name}</h5>
              </div>
            ))}
          </>
        </div>
      </div>
    </>
  );
}

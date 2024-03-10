import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import LodaingScreen from "../LoadingScreen/LodaingScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function AllOrders() {
  let navigate = useNavigate();

  function getOrders() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem(
        "ownerId"
      )}`
    );
  }

  let { data, isLoading, isFetching } = useQuery("getOrders", getOrders);

  if (isLoading || isFetching) return <LodaingScreen />;

  if (data.data.length === 0) {
    return (
      <>
        <Helmet>
          <title>All Orders</title>
        </Helmet>
        <div className="container bg-light my-5  rounded-2 py-3 myhight">
          <h2 className=" fs-3 fw-semibold mb-4">You Don't Have Orders Yet </h2>
          <button
            onClick={() => {
              navigate("/products");
            }}
            className="btn bg-main fw-semibold text-white"
          >
            Continue Shopping...
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>AllOrders</title>
      </Helmet>
      <div className="container bg-light">
        <div className="row">
          {data?.data.map((prod, idx) => {
            return (
              <div key={idx} className="col-md-6 p-3">
                <div className="order bg-white p-2  ">
                  <h5 className="h4 fw-bold  py-2 text-main">
                    Payment Method: {prod.paymentMethodType}
                  </h5>
                  <h5 className="h4 fw-bold text-main">
                    Order Price: {prod.totalOrderPrice} EGP
                  </h5>
                  <p>
                    <span className="pe-2">Order Date:</span>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      minute: "numeric",
                      hour: "2-digit",
                    }).format(new Date(prod.createdAt))}
                  </p>
                  <div className="product-details row mt-5  mx-2">
                    {prod.cartItems.map((item, idx2) => {
                      return (
                        <div key={idx2} className="details col-md-3">
                          <img
                            src={item.product.imageCover}
                            className=" w-100"
                            alt=""
                          />
                          <h6 className=" text-center mt-3 fw-semibold ">
                            {item.product.title
                              .split(" ")
                              .slice(0, 2)
                              .join(" ")}{" "}
                            ({item.count})
                          </h6>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

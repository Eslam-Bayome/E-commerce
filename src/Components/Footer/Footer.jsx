import React from "react";
import appStore from "../../images/128x128.png";
import googleStore from "../../images/googleplay.png";

export default function Footer() {
  return (
    <>
      <div className="container-fluid bg-main-light px-5 py-4 mt-4">
        <div className="row pb-3">
          <h3>Get the Fresh cart App</h3>
          <p className="text-black-50">
            We will send you a link, open it on your phone to download the app
          </p>
        </div>
        <div className="row gy-4 align-items-center">
          <div className="col-md-8 ">
            <input
              type="email"
              className="form-control"
              placeholder="Email .."
            />
          </div>
          <div className="col-md-4">
            <button className="btn btn-success bg-main ">Share App Link</button>
          </div>
          <div className="col-md-6 ">
            <h6>
              Payment Partnert <i className="fa-brands fa-amazon-pay mx-2"></i>
              <i className="fa-brands fa-cc-paypal mx-2"></i>
              <i className="fa-brands fa-cc-mastercard mx-2"></i>
            </h6>
          </div>
          <div className="col-md-6 ps-3">
            <span>Get delivires with FreshCart</span>
            <img src={appStore} alt="apple store" className="mx-1" />
            <img src={googleStore} alt="google store" />
          </div>
        </div>
      </div>
    </>
  );
}

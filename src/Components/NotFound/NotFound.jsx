import React from "react";
import notfound from "../../images/error.svg";

export default function NotFound() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <img src={notfound} alt="Page Not Found" className="w-100" />
          </div>
        </div>
      </div>
    </>
  );
}

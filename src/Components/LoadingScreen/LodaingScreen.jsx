import React from "react";
import { BallTriangle } from "react-loader-spinner";

export default function LodaingScreen() {
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center .text-secondary-emphasis bg-opacity-50 ">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

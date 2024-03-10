import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useContext, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { CreateAuth } from "./../../Context/AuthContext";
import { Helmet } from "react-helmet";

export default function ResetCode() {
  let { setNewPass } = useContext(CreateAuth);

  let myTimer;
  const [isSuccess, setIsSuccess] = useState(false);
  const [failMsg, setFailMsg] = useState(undefined);
  const [sucMsg, setSucMsg] = useState(undefined);
  const [seccionMsg, setSeccionMsg] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(true);
  const [seccionTime, setseccionTime] = useState(false);
  const navigate = useNavigate();

  const userData = {
    resetCode: "",
  };

  useEffect(() => {
    setseccionTime(true);
    timer && setCountDown();
    return () => {
      clearInterval(myTimer);
    };
  }, []);

  function setCountDown() {
    clearInterval(myTimer);
    setTimer(false);
    let mtime = 120 * 1000;

    function tick() {
      let ourDate = new Intl.DateTimeFormat("en-US", {
        minute: "numeric",
        second: "2-digit",
      }).format(mtime);

      setSeccionMsg(ourDate);

      if (mtime === 0) {
        setseccionTime(false);
        setFailMsg("Seccion Time is Ended");
        setTimer(true);
        clearInterval(myTimer);
        setTimeout(() => {
          setFailMsg(undefined);
          navigate("/login");
        }, 2000);
      }

      mtime -= 1000;
    }
    tick();

    myTimer = setInterval(tick, 1000);
  }

  let myonSubmit = async function (values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      );

      setIsSuccess(true);
      setFailMsg(undefined);
      setIsLoading(false);
      setSucMsg(data.status);
      setNewPass(true);
      setTimeout(() => {
        setIsSuccess(false);
        navigate("/newpassword");
      }, 2000);
    } catch (error) {
      setIsSuccess(false);
      setIsLoading(false);
      console.log(error);
      setFailMsg(
        error.response.data.message == "fail"
          ? error.response.data.errors.msg
          : error.response.data.message
      );
      setTimeout(() => {
        setFailMsg(undefined);
      }, 5000);
    }
  };

  let myForm = useFormik({
    initialValues: userData,
    onSubmit: myonSubmit,
    validationSchema: Yup.object({
      resetCode: Yup.string().required("Please Write The Code in Your Email"),
    }),
  });

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className="w-75 m-auto p-5 myhight">
        <h3 className="fw-bold">Reset Password:</h3>
        <form
          action=""
          className=" d-flex flex-column"
          onSubmit={myForm.handleSubmit}
        >
          <label htmlFor="resetCode">resetCode:</label>
          <input
            value={myForm.values.resetCode}
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            id="resetCode"
            type="text"
            className="form-control"
          />

          {myForm.errors.resetCode && myForm.touched.resetCode && (
            <div className="alert alert-danger ">{myForm.errors.resetCode}</div>
          )}

          <div className=" d-flex justify-content-between">
            <button
              type="submit"
              className="bg-main border-0 mt-2  rounded-2 text-white   "
            >
              {isLoading ? (
                <ColorRing
                  visible={true}
                  height="35"
                  width="35"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={["white", "white", "white", "white", "white"]}
                />
              ) : (
                "Send Code"
              )}
            </button>

            {seccionTime && <div className=" p-3 fw-bold"> {seccionMsg} </div>}
          </div>

          {isSuccess ? (
            <div className="alert alert-success text-center">{sucMsg}</div>
          ) : (
            ""
          )}
          {failMsg ? (
            <div className="alert alert-danger text-center">{failMsg}</div>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
}

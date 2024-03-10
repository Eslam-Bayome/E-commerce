import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useContext } from "react";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { CreateAuth } from "./../../Context/AuthContext";
import { Helmet } from "react-helmet";

export default function ForgetPass() {
  const userData = {
    email: "",
  };

  const [isSuccess, setIsSuccess] = useState(false);
  const [failMsg, setFailMsg] = useState(undefined);
  const [sucMsg, setSucMsg] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let myonSubmit = async function (values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      );

      setIsSuccess(true);
      setFailMsg(undefined);
      setIsLoading(false);
      setSucMsg(data.message);
      setTimeout(() => {
        setIsSuccess(false);
        navigate("/resetcode");
      }, 2000);
    } catch (error) {
      setIsSuccess(false);
      setIsLoading(false);

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
      email: Yup.string()
        .required("Email Is Requeired")
        .email("Email Must be Valid"),
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
          <label htmlFor="email">Email:</label>
          <input
            value={myForm.values.email}
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            id="email"
            type="email"
            className="form-control"
          />

          {myForm.errors.email && myForm.touched.email && (
            <div className="alert alert-danger ">{myForm.errors.email}</div>
          )}

          <button
            type="submit"
            className="bg-main border-0 p-1 mt-2 py-2 rounded-2 text-white  align-self-end  "
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

import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useContext } from "react";
import { ColorRing } from "react-loader-spinner";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { CreateAuth } from "./../../Context/AuthContext";
import { Helmet } from "react-helmet";

export default function Login() {
  let { token, setToken, newPass, setNewPass } = useContext(CreateAuth);

  const userData = {
    email: "",
    newPassword: "",
  };

  const [isSuccess, setIsSuccess] = useState(false);
  const [failMsg, setFailMsg] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  let myonSubmit = async function (values) {
    setIsLoading(true);
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        values
      );

      setIsSuccess(true);
      setFailMsg(undefined);
      setIsLoading(false);
      setTimeout(() => {
        setIsSuccess(false);
        setNewPass(false);
        navigate("/login");
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
      newPassword: Yup.string()
        .required("Password Is Requeired")
        .min(6, "must be at least 6 chars"),
    }),
  });

  if (!newPass) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className="w-75 m-auto p-5 myhight">
        <h2>New Password :</h2>
        <form
          action=""
          className=" d-flex flex-column"
          onSubmit={myForm.handleSubmit}
        >
          <label htmlFor="email">email:</label>
          <input
            value={myForm.values.email}
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            id="email"
            type="email"
            className="form-control"
          />
          {myForm.errors.email && myForm.touched.email ? (
            <div className="alert alert-danger">{myForm.errors.email}</div>
          ) : (
            ""
          )}
          <label htmlFor="newPassword">New Password:</label>
          <input
            value={myForm.values.newPassword}
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            id="newPassword"
            type="password"
            className="form-control"
          />

          {myForm.errors.newPassword && myForm.touched.newPassword ? (
            <div className="alert alert-danger">
              {myForm.errors.newPassword}
            </div>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="bg-main border-0 p-1 mt-2 py-2 rounded-2 text-white   "
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
              "Reset Password"
            )}
          </button>

          {isSuccess ? (
            <div className="alert alert-success text-center">
              Password Reset Successfully
            </div>
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

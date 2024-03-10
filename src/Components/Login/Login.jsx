import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useContext } from "react";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { CreateAuth } from "./../../Context/AuthContext";
import { Helmet } from "react-helmet";
import { createWishListCont } from "../../Context/WishListContext";

export default function Login() {
  let { setToken, getUserId } = useContext(CreateAuth);
  let { getUserWishlist } = useContext(createWishListCont);

  const userData = {
    email: "",
    password: "",
  };

  const [isSuccess, setIsSuccess] = useState(false);
  const [failMsg, setFailMsg] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let myonSubmit = async function (values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );

      if (data.message !== "success") return;

      localStorage.setItem("tkn", data.token);
      setToken(data.token);
      getUserId();
      getUserWishlist();

      setIsSuccess(true);
      setFailMsg(undefined);
      setIsLoading(false);

      setTimeout(() => {
        setIsSuccess(false);
        navigate("/products");
      }, 2000);
    } catch (error) {
      setIsSuccess(false);
      setIsLoading(false);

      setFailMsg(
        error.response.data.message === "fail"
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
      password: Yup.string()
        .required("Password Is Requeired")
        .min(6, "must be at least 6 chars"),
    }),
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-75 m-auto p-5 myhight">
        <h2>Login Now:</h2>
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
          <label htmlFor="password">password:</label>
          <input
            value={myForm.values.password}
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            id="password"
            type="password"
            className="form-control"
          />

          {myForm.errors.password && myForm.touched.password ? (
            <div className="alert alert-danger">{myForm.errors.password}</div>
          ) : (
            ""
          )}

          <div className="btns d-flex justify-content-between">
            <Link
              to={"/forgetPass"}
              className=" border-0  rounded-2  py-2  bg-transparent  fw-bold  h6 text-primary"
            >
              Forget Password ?
            </Link>
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
                "Login"
              )}
            </button>
          </div>
          {isSuccess ? (
            <div className="alert alert-success text-center">Welcome Back</div>
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

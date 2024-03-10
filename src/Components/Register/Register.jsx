import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function Register() {
  const userData = {
    shippingAddress: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  };

  const [isSuccess, setIsSuccess] = useState(false);
  const [failMsg, setFailMsg] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let myonSubmit = async function (values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      setIsSuccess(true);
      setFailMsg(undefined);
      setIsLoading(false);
      setTimeout(() => {
        setIsSuccess(false);
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
      name: Yup.string()
        .required("Name Is Requeired")
        .min(3, "Name Must be more Than 3 Charachter")
        .max(12, "Name Must be less Than 12 Charachter")
        .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, "Numbers Are Not Allowed"),
      phone: Yup.string()
        .required("Phone Is Requeired")
        .matches(
          /^01[0125][0-9]{8}$/,
          "Phone Must be an Egyption Phone start with 01"
        ),
      email: Yup.string()
        .required("Email Is Requeired")
        .email("Email Must be Valid"),
      password: Yup.string()
        .required("Password Is Requeired")
        .min(6, "must be at least 6 chars"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),
  });

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="w-75 m-auto p-5">
        <h2>Register Now:</h2>
        <form
          action=""
          className=" d-flex flex-column"
          onSubmit={myForm.handleSubmit}
        >
          <label htmlFor="name">name:</label>
          <input
            value={myForm.values.name}
            type="text"
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            id="name"
            className="form-control"
          />

          {myForm.errors.name && myForm.touched.name ? (
            <div className="alert alert-danger">{myForm.errors.name}</div>
          ) : (
            ""
          )}
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

          <label htmlFor="rePassword">rePassword:</label>
          <input
            value={myForm.values.rePassword}
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            id="rePassword"
            type="password"
            className="form-control"
          />

          {myForm.errors.rePassword && myForm.touched.rePassword ? (
            <div className="alert alert-danger">{myForm.errors.rePassword}</div>
          ) : (
            ""
          )}

          <label htmlFor="phone">phone:</label>
          <input
            onBlur={myForm.handleBlur}
            value={myForm.values.phone}
            onChange={myForm.handleChange}
            id="phone"
            type="text"
            className="form-control"
          />

          {myForm.errors.phone && myForm.touched.phone ? (
            <div className="alert alert-danger">{myForm.errors.phone}</div>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="bg-main border-0 p-1 mt-2 py-2 rounded-2 text-white  align-self-end "
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
              "Register"
            )}
          </button>
          {isSuccess ? (
            <div className="alert alert-success text-center">Success</div>
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

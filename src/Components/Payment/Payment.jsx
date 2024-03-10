import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
export default function Payment() {
  let { cartId, clearCart, totalCartPrice, getUserDetails } =
    useContext(cartContext);

  const userData = {
    details: "",
    phone: "",
    city: "",
  };
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const navigate = useNavigate();

  let payCash = async function (values) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        values,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      toast.success("Your order has been successfully placed");
      clearCart();
      setIsLoading(false);
      setTimeout(() => {
        navigate("/products");
      }, 1500);
    } catch (error) {
      setIsLoading(false);
    }
  };

  let payOnline = async function (values) {
    setIsLoading2(true);
    setIsFormValidated(false);
    await myForm.validateForm();

    if (!myForm.isValidating) {
      setIsFormValidated(true);
    }

    if (isFormValidated && myForm.isValid) {
      try {
        let { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
          values,
          {
            headers: {
              token: localStorage.getItem("tkn"),
            },
            params: {
              url: `http://${window.location.host}`,
            },
          }
        );
        window.open(data.session.url, "_self");
        setIsLoading2(false);
      } catch (error) {
        setIsLoading2(false);
      }
    } else {
      toast.error("Please fill out all required fields correctly.", {
        duration: 2000,
      });
    }
  };

  let myonSubmit = async function (values) {
    payCash(values);
    setIsLoading(true);
  };

  let myForm = useFormik({
    initialValues: userData,
    onSubmit: myonSubmit,
    validationSchema: Yup.object({
      phone: Yup.string()
        .required("Phone Is Requeired")
        .matches(
          /^01[0125][0-9]{8}$/,
          "Phone Must be an Egyption Phone start with 01"
        ),
      city: Yup.string().required("city Is Requeired"),

      details: Yup.string()
        .required("details Is Requeired")
        .min(10, "must be at least 10 chars"),
    }),
  });

  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <div className="w-75 m-auto p-5">
        <div className="details d-flex justify-content-between mb-3  ">
          <h2 className="fw-bold"> CheckOut:</h2>
          <h4 className="text-main h2 fw-semibold">
            Total Price: {totalCartPrice}EGP
          </h4>
        </div>

        <form className=" d-flex flex-column" onSubmit={myForm.handleSubmit}>
          <label htmlFor="city" className="fw-semibold my-2">
            City:
          </label>
          <input
            value={myForm.values.city}
            type="text"
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            id="city"
            className="form-control"
          />

          {myForm.errors.city && myForm.touched.city ? (
            <div className="alert alert-danger">{myForm.errors.city}</div>
          ) : (
            ""
          )}
          <label htmlFor="details" className="fw-semibold my-2">
            Details:
          </label>
          <input
            value={myForm.values.details}
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            id="details"
            type="details"
            className="form-control"
          />
          {myForm.errors.details && myForm.touched.details ? (
            <div className="alert alert-danger">{myForm.errors.details}</div>
          ) : (
            ""
          )}

          <label htmlFor="phone" className="fw-semibold my-2">
            Phone:
          </label>
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

          <div className="d-flex justify-content-between mt-3">
            <button
              type="submit"
              className="bg-main border-0 p-1 mt-2 py-2 rounded-2 text-white fw-semibold  "
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
                " Cash Payment"
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                payOnline(myForm.values);
              }}
              className="bg-main border-0 p-1 mt-2 py-2 rounded-2 text-white fw-semibold   "
            >
              {isLoading2 ? (
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
                " Online Payment"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

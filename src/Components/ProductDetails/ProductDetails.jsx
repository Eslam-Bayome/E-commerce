import axios from "axios";
import React, { useContext, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { CreateAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import LodaingScreen from "../LoadingScreen/LodaingScreen";
import { Helmet } from "react-helmet";
export default function ProductDetails() {
  let { addProductToCart } = useContext(cartContext);
  const { setToken } = useContext(CreateAuth);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [showFlyingString, setshowFlyingString] = useState(false);
  let { id } = useParams();

  const navigate = useNavigate();

  let addProduct = async function (id) {
    try {
      setIsLoadingCart(true);
      await addProductToCart(id);
      setIsLoadingCart(false);
      setshowFlyingString(true);
      setTimeout(() => setshowFlyingString(false), 1500);
    } catch (error) {
      setIsLoadingCart(false);

      toast.error(error.message, {
        duration: 1500,
      });

      setTimeout(() => {
        setToken(null);
        localStorage.removeItem("tkn");
        navigate("/login");
      }, 1700);
    }
  };
  function getProductDetail() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  let { data, isError, isLoading } = useQuery(
    `getProductDetail-${id}`,
    getProductDetail
  );

  if (isLoading) {
    return <LodaingScreen />;
  }
  if (isError) {
    return <Navigate to={"/products"} />;
  }
  let productData = data.data.data;
  return (
    <>
      <Helmet>
        <title>{productData.title.split(" ").slice(0, 2).join(" ")}</title>
      </Helmet>
      <div className="container">
        <div className="row align-items-center  myhight  ">
          <>
            <div className="col-md-3">
              <img
                src={productData.imageCover}
                className="w-100"
                alt={productData.title}
              />
            </div>
            <div className="col-md-9">
              <h1 className="h4 fw-bold">{productData.title}</h1>
              <p>{productData.description}</p>
              <p className="fw-semibold">{productData.category.name}</p>
              <div className="d-flex justify-content-between">
                <p>{productData.price} EGP</p>
                <p>
                  <i
                    style={{
                      color: "gold",
                    }}
                    className="fa-solid fa-star"
                  ></i>
                  {productData.ratingsAverage}
                </p>
              </div>
              <button
                className="btn bg-main w-100 mb-4 text-white"
                onClick={() => {
                  addProduct(id);
                }}
              >
                {isLoadingCart ? (
                  <RotatingLines
                    visible={true}
                    height="35"
                    width="35"
                    color="white"
                    strokeWidth="2"
                    strokeColor="white"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  " + Add To Cart"
                )}
              </button>
              {showFlyingString && <div className="flying-string">+1</div>}
            </div>
          </>
        </div>
      </div>
    </>
  );
}

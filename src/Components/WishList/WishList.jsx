import React, { useContext, useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import LodaingScreen from "../LoadingScreen/LodaingScreen";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { createWishListCont } from "../../Context/WishListContext";
import { cartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

export default function Cart() {
  const {
    allProductsWishList,
    addToWishList,
    getUserWishlist,
    removerFromWishList,
  } = useContext(createWishListCont);

  const { addProductToCart } = useContext(cartContext);
  const [Loading, setLoading] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    getUserWishlist().then(() => {
      setLoading(false);
    });
  }, []);

  function addToCart(id) {
    toast.success("Product Added To Your Cart", {
      duration: 1000,
    });
    addProductToCart(id).then(() => {
      delItem(id);
    });
  }

  function delItem(id) {
    removerFromWishList(id)
      .then((message) => {
        toast.success(message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  if (Loading) return <LodaingScreen />;

  if (allProductsWishList.length === 0) {
    return (
      <>
        <Helmet>
          <title>WishList</title>
        </Helmet>
        <div className="container bg-light my-5  rounded-2 py-3 myhight">
          <h2 className=" fs-3 fw-semibold mb-4">Your WishList Is Empty. </h2>
          <button
            onClick={() => {
              navigate("/products");
            }}
            className="btn bg-main fw-semibold text-white"
          >
            Continue Shopping...
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>WishList</title>
      </Helmet>
      <div className="container bg-light my-5 rounded-2 py-3  myhight ">
        <h1 className="fw-bold mb-3">WishList :</h1>
        <div className="paying d-flex justify-content-between">
          <h4 className="text-main fw-semibold mb-3">
            Number Of Products {addToWishList}
          </h4>
        </div>

        {allProductsWishList?.map((prod, id) => {
          return (
            <>
              <div
                key={id}
                className=" row border-bottom border-1 border-black border-opacity-25  py-4 "
              >
                <div className="col-md-2 ">
                  <img
                    src={prod.imageCover}
                    className="w-100"
                    alt={prod.title}
                  />
                </div>
                <div className="col-md-8 align-self-center ">
                  <h5 className="fw-semibold">{prod.title}</h5>
                  <p className="text-main   fw-semibold">Price: {prod.price}</p>
                  <button
                    onClick={() => {
                      delItem(prod.id);
                    }}
                    className="mb-3 border-0 bg-transparent"
                  >
                    <i className="fa-solid fa-trash-can text-main pe-2 "></i>
                    Remove
                  </button>
                </div>
                <div className="col-md-2 align-self-center mt-2">
                  <button
                    className="btn btn-outline-success fw-bold"
                    onClick={() => {
                      addToCart(prod.id);
                    }}
                  >
                    Push To Cart
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

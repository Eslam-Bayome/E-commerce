import React, { useContext, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { CreateAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import LodaingScreen from "../LoadingScreen/LodaingScreen";
import { createWishListCont } from "../../Context/WishListContext";
import { Helmet } from "react-helmet";

export default function Products() {
  const { addProductToCart } = useContext(cartContext);
  const {
    addProductToWishList,
    WishListSucMsg,
    allProductsWishList,
    removerFromWishList,
  } = useContext(createWishListCont);
  const { setToken } = useContext(CreateAuth);
  const [Loading, setLoading] = useState(true);

  const navigate = useNavigate();

  let addProduct = async function (id) {
    try {
      await addProductToCart(id);
      toast.success("Added To Card ", {
        duration: 1500,
      });
      setLoading(false);
    } catch (error) {
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

  function manageWishList(id, e) {
    if (allProductsWishList.some((prod) => prod.id === id)) {
      e.target.classList.remove("onWishList");
      removerFromWishList(id)
        .then((data) => {
          toast.success(data, {
            duration: 1500,
          });
        })
        .catch((err) => {
          toast.error(err, {
            duration: 1500,
          });
        });
    } else {
      e.target.classList.add("onWishList");
      addProductToWishList(id)
        .then(() => {
          toast.success(WishListSucMsg, {
            duration: 1500,
          });
        })
        .catch((err) => {
          toast.error(err.message, {
            duration: 1500,
          });

          setTimeout(() => {
            setToken(null);
            localStorage.removeItem("tkn");
            navigate("/login");
          }, 1700);
        });
    }
  }
  async function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { isLoading, data } = useQuery("getAllProducts", getProducts, {
    refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchInterval: 5000,
    // cacheTime: 1000,
  });

  if (isLoading) {
    return <LodaingScreen />;
  }

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="container">
        <div className="row gy-3 mb-3">
          {data?.data.data.map((product, idx) => {
            return (
              <>
                <div key={idx} className="col-md-2 product position-relative">
                  <button
                    onClick={(e) => {
                      manageWishList(product.id, e);
                    }}
                    className={
                      (allProductsWishList.some((prod) => prod.id == product.id)
                        ? "onWishList"
                        : "") +
                      " position-absolute top-0 end-0 pt-1 pe-1 fs-4 border-0 bg-transparent"
                    }
                  >
                    <i className="fa-solid fa-heart  wishListIcon"></i>
                  </button>
                  <Link to={`/productDetails/${product.id}`}>
                    <div className=" p-2">
                      <img
                        src={product.imageCover}
                        className="w-100"
                        alt="product"
                      />
                      <h2 className="h6 text-main">{product.category.name}</h2>
                      <h3 className="h5  fw-semibold ">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <div className="d-flex justify-content-between">
                        {product.priceAfterDiscount ? (
                          <>
                            <p className="fw-semibold">
                              <span className="text-decoration-line-through me-2 small-font  fw-light">
                                {product.price}
                              </span>
                              {product.priceAfterDiscount} EGP
                            </p>
                          </>
                        ) : (
                          <p className="fw-semibold">{product.price} EGP</p>
                        )}
                        <p>
                          <i
                            style={{
                              color: "gold",
                            }}
                            className="fa-solid fa-star"
                          ></i>
                          {product.ratingsAverage}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <button
                    className="btn bg-main text-white  w-100"
                    onClick={(e) => {
                      addProduct(product.id).then(() => {
                        e.target.textContent = " Add";
                      });
                      e.target.textContent = "Loading...";
                    }}
                  >
                    Add
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

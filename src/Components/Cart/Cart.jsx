import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import LodaingScreen from "../LoadingScreen/LodaingScreen";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  let res = useContext(cartContext);
  const [Loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    res.cartId
      ? res.getUserDetails().then(() => {
          setLoading(false);
        })
      : res.clearCart().then(() => {
          setLoading(false);
        });
  }, []);

  function delItem(id) {
    res.deleteItem(id).catch((err) => {
      toast.error(err.message);
    });
  }

  function editItem(id, count) {
    res.updateCount(id, count).catch((err) => {
      toast.error(err.message);
    });
  }

  function clearUserCart() {
    res.clearCart().catch((err) => {
      toast.error(err.message);
    });
  }

  if (!res.allProducts) {
    return (
      <>
        <LodaingScreen />
      </>
    );
  }
  if (Loading) return <LodaingScreen />;

  if (res.allProducts.length === 0) {
    return (
      <>
        <Helmet>
          <title>Cart</title>
        </Helmet>
        <div className="container bg-light my-5  rounded-2 py-3 myhight">
          <h2 className=" fs-3 fw-semibold mb-4">Your Cart Is Empty. </h2>
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
        <title>Cart</title>
      </Helmet>
      <div className="container bg-light my-5 rounded-2 py-3  myhight ">
        <h1 className="fw-bold mb-3">Shop Cart:</h1>
        <div className="paying d-flex justify-content-between">
          <h4 className="text-main fw-semibold mb-3">
            Total Cart Price: {res.totalCartPrice} EGP
          </h4>
          <Link to="/payment">
            <button className="btn btn-outline-success fw-bold">
              Procced To Buy
            </button>
          </Link>
        </div>
        <button
          onClick={clearUserCart}
          className="btn btn-outline-danger fw-semibold "
        >
          Clear
        </button>

        {res.allProducts?.map((prod, id) => {
          return (
            <>
              <div
                key={id}
                className=" row border-bottom border-1 border-black border-opacity-25  py-4 "
              >
                <div className="col-md-2 ">
                  <img
                    src={prod.product.imageCover}
                    className="w-100"
                    alt={prod.product.title}
                  />
                </div>
                <div className="col-md-8 align-self-center ">
                  <h5 className="fw-semibold">{prod.product.title}</h5>
                  <p className="text-main   fw-semibold">Price: {prod.price}</p>
                  <button
                    onClick={() => {
                      delItem(prod.product.id);
                    }}
                    className="mb-3 border-0 bg-transparent"
                  >
                    <i className="fa-solid fa-trash-can text-main pe-2 "></i>
                    Remove
                  </button>
                </div>
                <div className="col-md-2 align-self-center mt-2">
                  <button
                    className="btn-border px-2 py-0 rounded-2 bg-transparent "
                    onClick={() => {
                      editItem(prod.product.id, prod.count + 1);
                    }}
                  >
                    +
                  </button>
                  <span className="mx-1">{prod.count}</span>
                  <button
                    className=" btn-border px-2 py-0 rounded-2 bg-transparent "
                    disabled={prod.count === 1}
                    onClick={() => {
                      editItem(prod.product.id, prod.count - 1);
                    }}
                  >
                    -
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

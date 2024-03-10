import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
import { CreateAuth } from "./../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";
import { createWishListCont } from "../../Context/WishListContext";

export default function Navbar() {
  const { token, setToken } = useContext(CreateAuth);
  const { addToWishList, setAddToWishList } = useContext(createWishListCont);
  let { numOfCartItems, setNumOfCartItems } = useContext(cartContext);

  let navigate = useNavigate();
  let logOut = function () {
    localStorage.removeItem("tkn");
    localStorage.removeItem("ownerId");
    setToken(null);
    setAddToWishList(null);
    setNumOfCartItems(null);
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Freash Cart" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/home">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link position-relative me-3"
                      to="/cart"
                    >
                      Cart <i className="fa-solid fa-cart-shopping"></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-2 bg-main text-white p-1 px-2 my-1 ">
                        {numOfCartItems || ""}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link position-relative me-3"
                      to="/wishlist"
                    >
                      Wishlist <i className="fa-regular fa-heart"></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-2 bg-dark text-white p-1 px-2 my-1 ">
                        {addToWishList || ""}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/products">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/categories">
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/brands">
                      Brands
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/allorders">
                      Orders
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>
              </ul>
            )}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <ul className="d-flex list-unstyled">
                <li>
                  <i className="fa-brands fa-instagram me-2"></i>
                </li>
                <li>
                  <i className="fa-brands fa-facebook me-2"></i>
                </li>
                <li>
                  <i className="fa-brands fa-tiktok me-2"></i>
                </li>
                <li>
                  <i className="fa-brands fa-youtube me-2"></i>
                </li>
                <li>
                  <i className="fa-brands fa-linkedin me-2"></i>
                </li>
                <li>
                  <i className="fa-brands fa-twitter me-2"></i>
                </li>
              </ul>
              {token ? (
                <li className="nav-item ">
                  <span onClick={logOut} role="button" className="nav-link">
                    LogOut
                  </span>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

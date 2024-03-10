import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const createWishListCont = createContext();

export default function WishListContext({ children }) {
  const [addToWishList, setAddToWishList] = useState(0);
  const [WishListSucMsg, setWishListSucMsg] = useState(undefined);
  const [allProductsWishList, setAllProductsWichList] = useState([]);

  async function getUserWishlist() {
    try {
      let data = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setAllProductsWichList(data.data.data);
      setAddToWishList(data.data.count);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
  async function addProductToWishList(id) {
    try {
      let data = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setWishListSucMsg(data.data.message);
      getUserWishlist();
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async function removerFromWishList(id) {
    try {
      let data = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      //   setWishListSucMsg(data.data.message);
      getUserWishlist();
      return data.data.message;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  useEffect(() => {
    localStorage.getItem("tkn") && getUserWishlist();
  }, []);

  return (
    <createWishListCont.Provider
      value={{
        addToWishList,
        addProductToWishList,
        WishListSucMsg,
        allProductsWishList,
        getUserWishlist,
        removerFromWishList,
        setAddToWishList,
      }}
    >
      {children}
    </createWishListCont.Provider>
  );
}

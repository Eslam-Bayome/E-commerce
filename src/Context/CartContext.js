import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CreateAuth } from "./AuthContext";

export let cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [cartId, setCartId] = useState(0);

  function updateUserInterface(res) {
    setAllProducts(res.data.data.products);
    setNumOfCartItems(res.data.numOfCartItems);
    setTotalCartPrice(res.data.data.totalCartPrice);
    setCartId(res.data.data._id);
  }
  let { token } = useContext(CreateAuth);

  async function addProductToCart(id) {
    try {
      let data = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart
      `,
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      setCartId(data.data.data._id);
      getUserDetails();
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async function updateCount(id, increase) {
    let answer = await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: increase },
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        updateUserInterface(res);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
    return answer;
  }

  async function deleteItem(id) {
    let answer = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        updateUserInterface(res);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
    return answer;
  }

  async function clearCart() {
    let answer = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        setAllProducts([]);
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setCartId(null);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
    return answer;
  }

  async function getUserDetails() {
    let answer = await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        updateUserInterface(res);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error.response.data.message);
      });
    return answer;
  }

  useEffect(() => {
    cartId
      ? localStorage.getItem("tkn") &&
        getUserDetails().catch((err) => {
          console.log(err);
        })
      : localStorage.getItem("tkn") && clearCart();
  }, [token]);

  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        numOfCartItems,
        setNumOfCartItems,
        totalCartPrice,
        allProducts,
        updateCount,
        deleteItem,
        clearCart,
        cartId,
        getUserDetails,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

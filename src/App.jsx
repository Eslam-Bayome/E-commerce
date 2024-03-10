import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import NotFound from "./Components/NotFound/NotFound";
import Login from "./Components/Login/Login";
import Products from "./Components/Products/Products";
import Register from "./Components/Register/Register";
import AuthContextProvider from "./Context/AuthContext";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import ProtectedRoute from "./Components/ProtetctedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Payment from "./Components/Payment/Payment";
import AllOrders from "./Components/AllOrders/AllOrders";
import Home from "./Components/Home/Home";
import ForgetPass from "./Components/ForgetPass/ForgetPass";
import ResetCode from "./Components/ResetCode/ResetCode";
import NewPassword from "./Components/NewPassword/NewPassword";
import Brands from "./Components/Brands/Brands";
import WishListContext from "./Context/WishListContext";
import WishList from "./Components/WishList/WishList";
import { Offline } from "react-detect-offline";

let myRouter = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgetpass",
        element: <ForgetPass />,
      },

      {
        path: "resetcode",
        element: <ResetCode />,
      },
      {
        path: "newpassword",
        element: <NewPassword />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <WishList>
            <Cart />
          </WishList>
        ),
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default function App() {
  const Client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={Client}>
        <AuthContextProvider>
          <WishListContext>
            <CartContextProvider>
              <RouterProvider router={myRouter} />
            </CartContextProvider>
          </WishListContext>
        </AuthContextProvider>
      </QueryClientProvider>
      <Toaster />

      <Offline>
        <div className=" offline fixed-top w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
          <div className="alert alert-danger text-center">
            <strong>Offline:</strong> Unable to connect to the internet
          </div>
        </div>
      </Offline>
    </>
  );
}

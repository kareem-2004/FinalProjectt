import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Notfound from "./components/Notfound/Notfound";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { CartContextProvider } from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./components/Checkout/Checkout";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import WishList from "./components/WishList/WishList";
import AllOrders from "./components/AllOrders/AllOrders";
import { WishlistContextProvider } from "./Context/WishlistContext";
let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: "true",
        element: (
          <ProtectedRoute>
            {" "}
            <Home />
          </ProtectedRoute>
        ),
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
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
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
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "ProductDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails/>
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList/>
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders/>
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
export default function App() {
  return (
    <>
      <CartContextProvider>
        <UserContextProvider>
        <WishlistContextProvider>
        <RouterProvider router={x}></RouterProvider>
        <Toaster/>
        </WishlistContextProvider>
        </UserContextProvider>
      </CartContextProvider>
    </>
  );
}

import axios from "axios";
import { createContext, useEffect, useState } from "react"
export let CartContext = createContext();
let headers = {
  token: localStorage.getItem("userToken"),
};
// const[cartId,setcartId]=useState(0)
export function CartContextProvider(props) {
  const [cartCount, setcartCount] = useState(0);
  function deleteItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  function updateItem(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function getCartItems() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => {
        setcartCount(res.data.numOfCartItems);
        return res;
      })
      .catch((error) => error);
  }
  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function getLoggedUserCart() {
    return axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers,
        }
      )
      .then((response) => {
        setcartId(res.data.data._id)
        return response
      })
      .catch((error) => error);
  }
  function checkOut(cartId,url,formValues) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        
        {
          shippingAddress:formValues
        },
        {
          headers,
        }
        
      )
      .then((response) => response)
      .catch((error) => error);  
  }
  useEffect(()=>{
    getLoggedUserCart()
  },[])
  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCartItems,
        deleteItem,
        updateItem,
        clearCart,
        cartCount,
        setcartCount,
        checkOut,
        getLoggedUserCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

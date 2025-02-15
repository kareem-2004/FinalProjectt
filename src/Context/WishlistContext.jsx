import { createContext, useEffect, useState } from "react";
import axios from "axios";
export let WishlistContext = createContext();
export function WishlistContextProvider({children}) {
  const [wishItems, setwishItems] = useState(0);
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  function addProductToWish(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: productId,
        },
        {
          headers,
        }
        
      )
      .then((res) => res
    )
      .catch((err) => err);
    
  }

  function deleteWishItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function getUserWish() {

    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers,
      })
      .then((res) => {
        setwishItems(res.data.count);
        return res;
      })
      .catch((err) => err);
  }
  return (
    <WishlistContext.Provider
      value={{
        addProductToWish,
        deleteWishItem,
        getUserWish,
        wishItems,
        setwishItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
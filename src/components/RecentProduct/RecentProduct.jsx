import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../Context/WishlistContext";
export default function RecentProduct() {
  let { addToCart, setcartCount, cartCount} = useContext(CartContext);
  let {addProductToWish}= useContext(WishlistContext)
  const [products, setproducts] = useState([]);
  async function addproducttowish(id)
  {
  let flag=  await addProductToWish(id);
  console.log(flag);
  if(flag)
  {
   toast("product added successfully to wishlist",{position:"top-center"})
 
  }else{
   toast.error("Error",{position:"top-center"})
 
  }
  

  }
  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    if (response.data.status === "success") {
      setcartCount(cartCount + 1);
      toast.success("Product added successfully");
    } else {
      toast.error("Error adding to cart");
    }
  }
  function getProduct() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        setproducts(res.data.data);
      })
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="lg:w-1/4 md:w-1/3 sm:w-1/2">
              <div className="product p-3">
                <Link to={`ProductDetails/${product.id}`}>
                  <img src={product.imageCover} className="w-full" alt="" />
                  <h3 className=" text-emerald-500">{product.category.name}</h3>
                  <h3 className="font-semibold mb-3">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-400"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => addProductToCart(product.id)}
                  type="button"
                  className="focus:outline-none text-white bg-emerald-500 hover:bg-emerald-400 focus:ring-4
                   focus:ring-emerald-300  rounded-lg p-2 mt-2 "
                >
                  Add to cart
                </button>
                <button
              onClick={()=>addproducttowish(product._id)}
                title="Add to Wishlist"
                className="p-2 text-white bg-emerald-500 rounded-full mx-12"
              >
                <i className="fa-solid fa-heart"></i>
              </button>
              </div>
            </div>
          ))
        ) : (
          <div className="spinner"></div>
        )}
      </div>
    </>
  );
}

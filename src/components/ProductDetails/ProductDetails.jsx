import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
export default function ProductDetails() {
  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    if (response.data.status === "success") {
      toast.success("Product added successfully", {});
    } else {
      toast.error("error");
    }
  }
  let { addToCart } = useContext(CartContext);
  const [product, setproduct] = useState(null);
  let { id } = useParams();
  function getSpecificProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setproduct(res.data.data);
      })
      .catch((res) => {});
  }
  useEffect(() => {
    getSpecificProduct(id);
  }, []);
  return (
    <div className="row items-center">
      <div className="w-1/4">
        <img src={product?.imageCover} className="w-full" alt="" />
      </div>
      <div className="w-3/4 p-4">
        <h3 className="font-semibold capitalize">{product?.title}</h3>
        <h4 className="text-gray-500 my-4">{product?.description}</h4>
        <h4 className="my-4">{product?.category.name}</h4>
        <div className="flex justify-between my-5">
          <span>{product?.price}EGP</span>
          <span>
            <i className="fas fa-star text-yellow-400"></i>
            {product?.ratingsAverage}
          </span>
        </div>
        <button
          onClick={() => addProductToCart(product.id)}
          type="button"
          class="focus:outline-none text-white bg-emerald-500 hover:bg-emerald-400 focus:ring-4
                   focus:ring-emerald-300  rounded-lg px-1 py-1 mt-2 w-full "
        >
          Add to cart
        </button>
        
      </div>
    </div>
  );
}

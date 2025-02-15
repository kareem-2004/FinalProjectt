import React, { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Cart() {
  const [cartDetails, setcartDetails] = useState(null);
  let { getCartItems, deleteItem, updateItem, setcartCount,cartCount } =
    useContext(CartContext);
  async function getCart() {
    let response = await getCartItems();
    setcartDetails(response.data);
  }
  async function deleteCartItem(productId) {
    let response = await deleteItem(productId);
    setcartCount(cartCount-1)
    setcartDetails(response.data);
  }
  async function updateCartItem(productId, count) {
    let response = await updateItem(productId, count);
    setcartDetails(response.data);
  }
  async function clearItem() {
    if (!cartDetails?.data.products.length) return; // Prevent errors when cart is empty

    for (const product of cartDetails.data.products) {
        await deleteItem(product.product.id); // Remove each product
    }

    setcartCount(0); // Reset cart count
    setcartDetails(null); // Empty cart
}
  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartDetails?.data.products.map((product) => (
              <tr
                key={product.product.id}
                className="bg-white border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-4">
                  <img
                    src={product.product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt="Apple Watch"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 ">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        updateCartItem(product.product.id, product.count - 1)
                      }
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <span>{product.count}</span>
                    </div>
                    <button
                      onClick={() =>
                        updateCartItem(product.product.id, product.count + 1)
                      }
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {product.price}EGP
                </td>
                <td className="px-6 py-4">
                  <span
                    onClick={() => deleteCartItem(product.product.id)}
                    className="font-medium text-red-600 hover:underline cursor-pointer"
                  >
                    Remove
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="m-10">
          <Link to={"/checkout"}>
            <button
              type="button"
              class="focus:outline-none text-white bg-emerald-500 hover:bg-emerald-400 focus:ring-4 m-2
           focus:ring-emerald-300  rounded-lg py-2 w-[50%]"
            >
              Check Out
            </button>
          </Link>
          <button
          onClick={clearItem}
            type="button"
            class="focus:outline-none text-white bg-red-500 hover:bg-red-400 focus:ring-4 m-2
           focus:ring-red-300  rounded-lg  py-2 w-[25%]"
          >
            Clear cart
          </button>
        </div>
      </div>
    </>
  );
}

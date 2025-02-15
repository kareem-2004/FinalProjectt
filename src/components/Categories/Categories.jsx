import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Categories() {
  const [categories, setcategories] = useState([]);
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setcategories(res.data.data);
      })
      .catch((res) => {});
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <div className="row">
        {categories.length > 0 ? (
          categories.map((product) => (
            <div key={product.id} className=" rounded-lg shadow-md lg:w-1/5 md:w-1/3 sm:w-1/2">
              <div className="product p-3">
                <Link>
                  <img src={product.image} className="w-full object-cover h-[250px]" alt="" />
                  <h4>{product.name}</h4>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div class="spinner"></div>
        )}
      </div>
    </>
  );
}
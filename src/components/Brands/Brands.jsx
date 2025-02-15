import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Categories() {
  const [brands, setbrands] = useState([]);
  function getBrands() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        setbrands(res.data.data);
      })
      .catch((res) => {});
  }
  useEffect(() => {
    getBrands();
  }, []);
  return (
    <>
      <div className="row">
        {brands.length > 0 ? (
          brands.map((product) => (
            <div key={product.id} className="rounded-lg shadow-md m-3 lg:w-1/6 md:w-1/5 sm:w-1/4 ">
              <div className="product p-3">
                <Link>
                  <img src={product.image} className="w-full object-cover" alt="" />
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
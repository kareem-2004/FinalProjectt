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
            <div key={product.id} className="w-1/5 rounded-lg shadow-md m-5">
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
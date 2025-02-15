import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
export default function CategorySlider() {
  const [categories, setcategories] =useState([])
   function getCategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
      setcategories(res.data.data)
    })
   }
useEffect(()=>{
  getCategories()
},[])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay:true,
    autoplayspeed:1000
  };
  return (
    <Slider {...settings}>
      {categories.map((category)=><div className="lg:w-1/4 md:w-1/3 sm:w-1/2">
        <img src={category.image} className="w-full h-[200px] object-cover rounded-lg p-1" alt="" />
        <h4>{category.name}</h4>
      </div>)}
    </Slider>
  );
}
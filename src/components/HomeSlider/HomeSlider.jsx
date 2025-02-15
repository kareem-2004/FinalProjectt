import React from "react";
import Slider from "react-slick";
import slider1 from "./../../assets/images/blog-img-1.jpeg";
import slider2 from "./../../assets/images/blog-img-2.jpeg";
export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplayspeed:1000
  };
  return (
    <section className="py-7 mb-5">
      <div className="flex flex-wrap justify-center items-center">
        <div className="w-full">
          <Slider {...settings}>
            <div>
              <img src={slider1} className="w-full h-[300px]" alt="" />
            </div>
            <div>
              <img src={slider2} className="w-full h-[300px] " alt="" />
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
}

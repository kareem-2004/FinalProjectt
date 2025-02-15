import React from "react";
import RecentProduct from "../RecentProduct/RecentProduct";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
export default function Home() {
  return (
    <>
    <HomeSlider/>
    <CategorySlider/>
    <RecentProduct/>
    </>
  );
}

import React from "react";
import style from "./Notfound.module.css";
import error from "./../../assets/images/error.svg"
export default function Notfound() {
  return (
    <>
      <div className="flex items-center justify-center">
      <img src={error} alt="error" />
      </div>
    </>
  );
}

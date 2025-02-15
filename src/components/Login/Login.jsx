import React, { useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
export default function Login() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [ApiError, setApiError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  function handleLogin(values) {
    setisLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setisLoading(false);
        if (res.data.message == "success") {
          localStorage.setItem("userToken", res.data.token);
          setuserLogin(res.data.token);
          navigate("/");
        } else {
        }
      })
      .catch((res) => {
        setisLoading(false);
        setApiError(res.response.data.message);
      });
  }
  let myValidation = yup.object().shape({
    email: yup.string().email("not valid email").required("email is requried"),
    password: yup
      .string()
      .required("password is requried")
      .min(6, "password min length is:6"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: myValidation,
    onSubmit: handleLogin,
  });
  return (
    <>
      {ApiError ? (
        <div className="w-1/4 mx-auto bg-red-600 text-white font-bold rounded-lg p-2 text-center">
          {ApiError}
        </div>
      ) : null}
      <div className="w-1/2 mx-auto text-emerald-500 font-bold text-2xl my-4 text-center">
        Login
      </div>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-5">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          ) : null}
        </div>
        <div>
          <button
            type="submit"
            className="text-white bg-emerald-500 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center   "
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>
          <span className="text-gray-500 ms-5">Don't have an account?</span>
          <Link to={"/register"} className="text-emerald-500 ms-1 underline">
            Register
          </Link>
        </div>
      </form>
    </>
  );
}

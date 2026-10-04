import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userContext } from '../../context/TokenContext';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';

export default function Signin() {
  const { setToken, setUserData } = useContext(userContext);

  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErr] = useState(null);

  // Validation
  const schemaValidation = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Enter a valid email'),

    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  localStorage.removeItem('code');
  localStorage.removeItem('verifycode');

  // Login function
  async function signIn(values) {
    setLoading(true);
    setErr(null);

    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signin',
        values
      );

      if (data.message === 'success') {
        // Save token
        localStorage.setItem('userToken', data.token);

        // Update context
        setToken(data.token);
        setUserData(data.user);

        // Save user data
        localStorage.setItem(
          'userProfile',
          JSON.stringify(data.user)
        );

        toast.success('Login Success');

        navigate('/');
      }
    } catch (err) {
      setErr(
        err.response?.data?.message ||
        'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: schemaValidation,

    onSubmit: signIn,
  });

  return (
    <div className="my-5">

      <Helmet>
        <meta charSet="utf-8" />

        <meta
          name="description"
          content="Sign in to your account. Access personalized features and manage your profile securely."
        />

        <title>Sign In</title>
      </Helmet>

      <h1 className="text-main text-center">
        Login Now
      </h1>

      <form
        onSubmit={formik.handleSubmit}
        className="mt-4"
      >

        <div className="row">

          <div className="col-md-8 m-auto bg-light p-4 shadow rounded-1">

            <div className="row gy-4">

              {/* Email */}
              <div className="col-md-12">

                <label htmlFor="email">
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="form-control mt-1"
                />

                {formik.errors.email &&
                  formik.touched.email && (
                    <p className="text-danger mt-1">
                      {formik.errors.email}
                    </p>
                  )}

              </div>

              {/* Password */}
              <div className="col-md-12">

                <label htmlFor="password">
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="form-control mt-1"
                />

                {formik.errors.password &&
                  formik.touched.password && (
                    <p className="text-danger mt-1">
                      {formik.errors.password}
                    </p>
                  )}

              </div>

              {/* API Error */}
              {errMsg && (
                <p className="text-danger text-center mt-1">
                  {errMsg}
                </p>
              )}

              {/* Login Button */}
              <div className="col-md-12 text-end my-3">

                <button
                  type="submit"
                  disabled={
                    !formik.isValid ||
                    !formik.dirty ||
                    isLoading
                  }
                  className="btn bg-main text-light"
                >
                  Login

                  {isLoading && (
                    <span>
                      <i className="fa-solid text-light mx-2 fa-spinner fa-spin"></i>
                    </span>
                  )}

                </button>

              </div>

              {/* Forgot Password */}
              <Link
                className="forget text-main fw-bold text-center text-decoration-underline"
                to="/forgetpassword"
              >
                Forgot Password?
              </Link>

              {/* Register */}
              <p className="text-muted">
                I don't have an account{' '}
                <Link
                  className="regest text-main fw-bold"
                  to="/signup"
                >
                  Register
                </Link>
              </p>

            </div>

          </div>

        </div>

      </form>

    </div>
  );
}

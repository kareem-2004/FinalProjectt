
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

export default function Signup() {
  localStorage.removeItem('code');
  localStorage.removeItem('verifycode');

  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErr] = useState(null);

  // Validation
  const schemaValidation = Yup.object({
    name: Yup.string()
      .min(3, 'Minimum length is 3 characters')
      .max(15, 'Maximum length is 15 characters')
      .required('Name is required'),

    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),

    phone: Yup.string()
      .required('Phone is required')
      .matches(
        /^01[0125][0-9]{8}$/,
        'Enter a valid Egyptian phone number'
      ),

    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),

    rePassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  });

  // Signup function
  async function signUp(values) {
    setLoading(true);
    setErr(null);

    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
        values
      );

      if (data.message === 'success') {
        toast.success('Register Success');
        navigate('/signin');
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
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema: schemaValidation,
    onSubmit: signUp,
  });

  return (
    <div className="my-3">

      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Join our community! Sign up now to access exclusive offers and personalized features."
        />
        <title>Sign Up</title>
      </Helmet>

      <h1 className="text-main text-center">
        Register Now
      </h1>

      <form onSubmit={formik.handleSubmit}>

        <div className="row">

          <div className="col-md-8 m-auto bg-light p-4 shadow rounded-1">

            <div className="row gy-4">

              {/* Name */}
              <div className="col-md-12">

                <label htmlFor="name">
                  Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="form-control mt-1"
                />

                {formik.errors.name && formik.touched.name && (
                  <p className="text-danger mt-1">
                    {formik.errors.name}
                  </p>
                )}

              </div>

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

                {formik.errors.email && formik.touched.email && (
                  <p className="text-danger mt-1">
                    {formik.errors.email}
                  </p>
                )}

              </div>

              {/* Phone */}
              <div className="col-md-12">

                <label htmlFor="phone">
                  Phone
                </label>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="form-control mt-1"
                />

                {formik.errors.phone && formik.touched.phone && (
                  <p className="text-danger mt-1">
                    {formik.errors.phone}
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

                {formik.errors.password && formik.touched.password && (
                  <p className="text-danger mt-1">
                    {formik.errors.password}
                  </p>
                )}

              </div>

              {/* Confirm Password */}
              <div className="col-md-12">

                <label htmlFor="rePassword">
                  Confirm Password
                </label>

                <input
                  type="password"
                  id="rePassword"
                  name="rePassword"
                  value={formik.values.rePassword}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="form-control mt-1"
                />

                {formik.errors.rePassword &&
                  formik.touched.rePassword && (
                    <p className="text-danger mt-1">
                      {formik.errors.rePassword}
                    </p>
                  )}

              </div>

              {/* API Error */}
              {errMsg && (
                <p className="text-danger text-center">
                  {errMsg}
                </p>
              )}

              {/* Register Button */}
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

                  Register

                  {isLoading && (
                    <span>
                      <i className="fa-solid text-light mx-2 fa-spinner fa-spin"></i>
                    </span>
                  )}

                </button>

              </div>

              {/* Login Link */}
              <p className="text-muted mt-2">
                I have an account
                <Link
                  className="logpage text-main fw-bold"
                  to="/signin"
                >
                  {' '}
                  Login
                </Link>
              </p>

            </div>

          </div>

        </div>

      </form>

    </div>
  );
}






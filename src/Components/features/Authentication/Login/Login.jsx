import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from "../../../../context/UserContext";
import Button from "../../../ui/Button/Button";
export default function Login() {
  const { setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  async function submitLogin(values) {
    setIsLoading(true);
    const { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });
    if (data.message === "success") {
      setIsLoading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
    }
  }
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(
        regexEmail,
        "Invalid email address. Please enter a valid email address,  example@gmail.com"
      )
      .required("Email Is Required"),
    password: Yup.string()
      .matches(
        regexPassword,
        "Invalid password, Your password must be at least 8 characters long and contain at least one uppercase constter, one lowercase constter, one digit, and one special character"
      )
      .required("Password Is Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitLogin,
  });
  return (
    <>
      <div style={{maxWidth:"400px"}} className=" m-auto bg-main-light p-4 mt-4 rounded-3">
        <h3 className="text-center fw-bold">Login</h3>
        <form onSubmit={formik.handleSubmit}>
          <label className="fw-bold" htmlFor="email">Email </label>
          <input
            className={`form-control mb-3  ${formik.errors.email && formik.touched.email ? "is-invalid" : ""
              } `}
            id="email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <small className="text-danger d-block fw-bolder mb-1">
              {formik.errors.email}
            </small>
          ) : (
            ""
          )}
          <label className="fw-bold" htmlFor="password">Password </label>
          <input
            className={`form-control mb-3 ${formik.errors.password && formik.touched.password
                ? "is-invalid"
                : ""
              } `}
            id="password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <small className="text-danger d-block fw-bolder mb-1">
              {formik.errors.password}
            </small>
          ) : (
            ""
          )}
          <div>
            {isLoading ? (
              <div className="d-flex flex-column">
                <button
                  disabled
                  type="button"
                  className="btn bg-main  text-white "
                >
                  <ThreeDots
                    height="25"
                    width="50"
                    radius="9"
                    color="#fff"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    wrapperClassName=""
                    visible={true}
                  />
                </button>
              </div>
            ) : (
              <div className="d-flex flex-column ">
                <Button
                  disabled={!formik.isValid || !formik.dirty}
                  type="submit"
                  className="btn bg-main text-white "
                >
                  Login
                </Button>
                <div className="d-flex align-items-center justify-content-center flex-column gap-2 mt-3">                
                    <Link
                      to="/forget-password"
                      className=" text-main fw-semibold text-decoration-none"
                    >
                      Forgot Your Password?
                    </Link>                 
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    <span className="fw-semibold">Don't have an account? </span>
                    <Link
                      to="/register"
                      className=" text-main fw-semibold  text-decoration-none"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
        {error && (
          <p className=" text-danger text-center fw-bolder mt-3">{error}</p>
        )}
      </div>
    </>
  );
}

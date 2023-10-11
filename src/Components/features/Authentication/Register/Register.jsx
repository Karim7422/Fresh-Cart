import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Button from "../../../ui/Button/Button";
import { UserContext } from "../../../../context/UserContext";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {setUserToken} = useContext(UserContext)
 
  async function submitRegister(values) {
    setIsLoading(true);
    const { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
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
  const regexPhone = /^\+?[1-9]\d{1,14}$/;
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Your name must be at least 3 characters")
      .max(30, "Your name can't exceed 30 characters")
      .required("Name is Required"),
    email: Yup.string()
      .matches(
        regexEmail,
        "Invalid email address. Please enter a valid email address,  example@gmail.com"
      )
      .required("Email Is Required"),
    phone: Yup.string()
      .matches(regexPhone, "Invalid phone number, only egyptian numbers are allowed, ex: +20123456789")
      .required("Phone Is Required"),
    password: Yup.string()
      .matches(
        regexPassword,
        "Invalid password, Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      )
      .required("Password Is Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password And Re-Password Doesn't Match")
      .required("Re-Password Is Required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: submitRegister,
  });
  return (
    <>
      <div style={{maxWidth:"400px"}} className=" m-auto bg-main-light p-5 rounded-3 mt-4">
        <h3 className="text-center fw-bold">Register Now</h3>
        <form onSubmit={formik.handleSubmit}>
          <label className="fw-bolder" htmlFor="name">Name </label>
          <input
            className={`form-control mb-3 ${
              formik.errors.name && formik.touched.name ? "is-invalid" : ""
            } `}
            id="name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <small className="text-danger d-block fw-bolder mb-1">
              {formik.errors.name}
            </small>
          ) : (
            ""
          )}
          <label className="fw-bolder" htmlFor="email">Email </label>
          <input
            className={`form-control mb-3 ${
              formik.errors.email && formik.touched.email ? "is-invalid" : ""
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
          <label className="fw-bolder" htmlFor="password">Password </label>
          <input
            className={`form-control mb-3 ${
              formik.errors.password && formik.touched.password
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
          <label className="fw-bolder" htmlFor="rePassword">Re-Password </label>
          <input
            className={`form-control mb-3 ${
              formik.errors.rePassword && formik.touched.rePassword
                ? "is-invalid"
                : ""
            } `}
            id="rePassword"
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <small className="text-danger d-block fw-bolder mb-1">
              {formik.errors.rePassword}
            </small>
          ) : (
            ""
          )}
          <label className="fw-bolder" htmlFor="phone">Phone </label>
          <input
            className={`form-control mb-3 ${
              formik.errors.phone && formik.touched.phone ? "is-invalid" : ""
            } `}
            id="phone"
            type="number"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <small className="text-danger d-block fw-bolder mb-1">
              {formik.errors.phone}
            </small>
          ) : (
            ""
          )}
          <div>
            {isLoading ? (
              <div className="d-flex flex-column">
                <Button
                  disabled
                  type="button"
                  moreClasses="btn bg-main  text-white "
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
                </Button>
              </div>
            ) : (
              <div className="d-flex flex-column">
                <Button
                  disabled={!formik.isValid || !formik.dirty}
                  type="submit"
                  moreClasses="btn bg-main text-white "
                >
                  Register
                </Button>
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

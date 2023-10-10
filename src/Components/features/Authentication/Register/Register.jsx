import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Button from "../../../ui/Button/Button";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
      navigate("/login");
    }
  }
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  const regexPhone = /^\+?[1-9]\d{1,14}$/;
  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name minLength is 3")
      .max(10, "Name maxLength is 10")
      .required("Name is Required"),

    email: Yup.string()
      .matches(
        regexEmail,
        "Invalid email address. Please enter a valid email address,  example@gmail.com"
      )
      .required("Email Is Required"),

    phone: Yup.string()
      .matches(regexPhone, "Invalid Phone Number, ex: +20123456789")
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
  let formik = useFormik({
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
      <div className="w-50 m-auto ">
        <h3 className="text-center fw-bold">Register Now</h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name :</label>
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
          <label htmlFor="email">Email :</label>
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
          <label htmlFor="password">Password :</label>
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
          <label htmlFor="rePassword">Re-Password :</label>
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
          <label htmlFor="phone">Phone :</label>
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

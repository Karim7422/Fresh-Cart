import React, { useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import Button from "../ui/Button/Button";
import { CartContext } from "../../context/CartContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import Spinner from "../ui/Spinner/Spinner"
export default function Payment() {
  const { payment, loading } = useContext(CartContext);
  async function handlePayment(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    await payment(Object.fromEntries(formData))
  }
  const regexPhone = /^\+?[1-9]\d{1,14}$/;
  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(regexPhone, "Invalid phone number, only egyptian numbers are allowed, ex: +20123456789")
      .required("Phone Number Is Required"),
      city: Yup.string().required("Your city is required"),
      details: Yup.string().required("Your address is required"),
  });
  const formik = useFormik({
    initialValues: {
      phone: "",
      city: "",
      details: "",
    },
    validationSchema,
    onSubmit: handlePayment,
  });
  return (
    <>
      <div className="w-50 m-auto mt-5 ">
        <form onSubmit={handlePayment}>
          {loading && <Spinner/>}
          <label htmlFor="phone" className="visually-hidden">
            Phone Number :
          </label>
          <input
            className={`form-control mb-3 ${
              formik.errors.phone && formik.touched.phone ? "is-invalid" : ""
            } `}
            id="phone"
            type="number"
            name="phone"
            placeholder="Enter Your Phone Number"
            aria-label="Phone Number"
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
          <label htmlFor="city" className="visually-hidden">
            City :
          </label>
          <input
            className={`form-control mb-3 ${
              formik.errors.city && formik.touched.city ? "is-invalid" : ""
            } `}
            id="city"
            type="text"
            name="city"
            placeholder="Enter Your City"
            aria-label="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.city && formik.touched.city ? (
            <small className="text-danger d-block fw-bolder mb-1">
              {formik.errors.city}
            </small>
          ) : (
            ""
          )}
          <textarea
            style={{ maxHeight: "150px", minHeight: "200px", overflow: "auto" }}
            placeholder="Address Details"
            className={`form-control mb-3 ${
              formik.errors.details && formik.touched.details ? "is-invalid" : ""
            } `}
            name="details"
            cols="30"
            rows="5"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.errors.details && formik.touched.details ? (
            <small className="text-danger d-block fw-bolder mb-1">
              {formik.errors.details}
            </small>
          ) : (
            ""
          )}
          <div>
            {loading ? (
              <div className="d-flex flex-column">
                <button
                  disabled={!formik.isValid || !formik.dirty}
                  type="submit"
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
              <div className="d-flex flex-column mt-3 ">
                <Button type="submit" className="btn bg-main  text-white "  disabled={!formik.isValid || !formik.dirty}>
                  Pay Now
                </Button>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

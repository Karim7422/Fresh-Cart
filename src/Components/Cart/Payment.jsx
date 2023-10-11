import React, { useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import Button from "../ui/Button/Button";
import { CartContext } from "../../context/CartContext";
export default function Payment() {
  const { payment, loading } = useContext(CartContext);
  async function handlePayment(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    await payment(Object.fromEntries(formData))
  }
  return (
    <>
      <div className="w-50 m-auto mt-5 ">
        <form onSubmit={handlePayment}>
          <label htmlFor="phone" className="visually-hidden">
            Phone Number :
          </label>
          <input
            className="form-control mb-3  "
            id="phone"
            type="tel"
            name="phone"
            placeholder="Enter Your Phone Number"
            aria-label="Phone Number"
          />
          <label htmlFor="city" className="visually-hidden">
            City :
          </label>
          <input
            className="form-control mb-3 "
            id="city"
            type="text"
            name="city"
            placeholder="Enter Your City"
            aria-label="City"
          />
          <textarea
            style={{ maxHeight: "150px", minHeight: "200px", overflow: "auto" }}
            placeholder="Address Details"
            className="form-control"
            name="details"
            cols="30"
            rows="5"
          ></textarea>
          <div>
            {loading ? (
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
              <div className="d-flex flex-column mt-3 ">
                <Button type="submit" className="btn bg-main  text-white ">
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

import React, { useContext, useEffect, useState } from "react";
import CartItem from "./CartItem";
import { CartContext } from "../../context/CartContext";
import Spinner from "../ui/Spinner/Spinner";
import Button from "../ui/Button/Button";
export default function Cart() {
  const { cart, getUserCart, resetCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      await getUserCart();
      setLoading(false);
    })();
  }, [getUserCart]);
  return (
    <section className="bg-main-light py-4 px-3">
      <h2 className="fw-bolder">Cart List</h2>
      {cart?.data?.data?.products.length > 0 ? (
        <>
          <span className="fw-bold">
            Total Cart Price :{" "}
            <span className="text-main">
              {cart?.data?.data.totalCartPrice} EGP
            </span>
          </span>
          {loading && <Spinner />}
          {cart?.data?.data?.products.map((product) => (
            <CartItem cartItem={product} key={product._id} />
          ))}
          <div className="d-flex gap-3 justify-content-center mt-3">
            <button className="btn btn-danger " onClick={() => resetCart()}>
              {" "}
              Reset Cart
            </button>
            <Button moreClasses={`d-flex align-items-center`} type="link" to="checkout">
              Make Purchase
            </Button>
          </div>
        </>
      ) : (
        <p className="fw-bolder text-danger ">Your Cart Is Empty</p>
      )}
    </section>
  );
}

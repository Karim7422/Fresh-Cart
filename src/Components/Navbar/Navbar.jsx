import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { UserContext } from "../../context/UserContext";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";
export default function Navbar() {
  const { userToken, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  const {cart}=useContext(CartContext)
  function logout() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="fresh cart logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userToken !== null ? (
                <>
                  <li className="nav-item">
                    <NavLink className=" nav-link fw-bold " to="/">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link fw-bold" to="/products">
                      Products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link fw-bold" to="/categories">
                      Categories
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link fw-bold" to="/brands">
                      Brands
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link fw-bold" to="/wish-list">
                      Wish List
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav d-flex align-items-center mb-2  mb-lg-0">
              <li className="nav-item d-flex align-items-center mx-3">
                <i className="cursor-pointer fab fs-5 mx-2 fa-facebook"></i>
                <i className="cursor-pointer fab fs-5 mx-2 fa-twitter"></i>
                <i className="cursor-pointer fab fs-5 mx-2 fa-instagram"></i>
                <i className="cursor-pointer fab fs-5 mx-2 fa-youtube"></i>
                <i className="cursor-pointer fab fs-5 mx-2 fa-tiktok"></i>
                <i className="mx-2 fs-5 line">
                  <Link className={`${styles.cartButton} `} data-cart-items={cart?.data?.numOfCartItems} to="/cart">
                    <FaShoppingCart />
                  </Link>
                </i>
              </li>
              {userToken !== null ? (
                <li className="nav-item">
                  <span
                    onClick={() => logout()}
                    className=" fw-bold cursor-pointer"
                  >
                    Logout
                  </span>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    to="/login"
                    className=" loginBtn nav-link cursor-pointer fw-bold"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

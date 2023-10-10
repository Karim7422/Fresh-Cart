import React from "react";
import styles from "../Footer/Footer.module.css";
import app_store from "../../../Assets/images/App Store.png";
import play_store from "../../../Assets/images/Google Play.png";
import amazon_img from "../../../Assets/images/2560px-Amazon_Pay_logo.svg.png";
import express_img from "../../../Assets/images/American-Express-Logo-PNG-File.png";
import paypal_img from "../../../Assets/images/PayPal.svg.png";
import mastercard_img from "../../../Assets/images/purepng.com-mastercard-logologobrand-logoiconslogos-251519938372dnf77.png";
import Button from "../Button/Button";
export default function Footer() {
    return (
        <footer className=" custom_style">
            <div className="py-5">
                <div className="  ">
                    <h3 className="fw-semibold ">Get the FreshCart app</h3>
                    <p className="text-gray">
                        We will send you a link, open it on your phone to download the app.
                    </p>
                </div>
                <div
                    className={`${styles.footerForm}  d-flex justify-content-between gap-3 gap-sm-4 flex-wrap flex-sm-nowrap mb-3`}
                >
                    <input
                        className="form-control  "
                        type="email"
                        placeholder="Enter Your Email ... "
                    />
                  <Button>Share App Link</Button>
                </div>
                <div className=" gap-5 gap-md-3 flex-wrap  d-flex justify-content-between align-items-center">
                    <div
                        className={`${styles.paymentPartners} gap-3 d-flex align-items-center  `}
                    >
                        <h5 className="mb-0 fw-semibold">Payment Partners</h5>
                        <ul className="list-unstyled d-flex gap-2 flex-wrap mb-0 ">
                            <li className="my-auto">
                                <img src={amazon_img} alt="amazon_img" />
                            </li>
                            <li className="my-auto">
                                <img src={express_img} alt="americanExpress_img" />
                            </li>
                            <li>
                                <img src={mastercard_img} alt="mastercard_img" />
                            </li>
                            <li className="my-auto">
                                <img src={paypal_img} alt="paypal_img" />
                            </li>
                        </ul>
                    </div>
                    <div className={`${styles.stores} d-flex gap-3 align-items-center`}>
                        <h5 className="fw-semibold mb-0">Get deliveries with FreshCart</h5>
                        <ul className="list-unstyled mb-0 d-flex">
                            <li>
                                <img src={app_store} alt="appStore_img" />
                            </li>
                            <li>
                                <img src={play_store} alt="googlePlay_img" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

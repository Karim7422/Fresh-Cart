import React from "react";
import Button from "../ui/Button/Button";

export default function OrderPayed() {
    return (
        <div className="row" style={{ height: "50vh" }}>
            <div className="col d-flex justify-content-center align-items-center flex-column ">
                <h2 className="fw-bolder text-main my-4">
                    Your Order Has Been Purchased Successfully
                </h2>
                <Button type="link" to="/">
                    Bact To Home Page
                </Button>
            </div>
        </div>
    );
}

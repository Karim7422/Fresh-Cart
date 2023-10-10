import React from "react";
import notFound from "../../../Assets/images/error.svg";
export default function NotFound() {
    return (
        <div
            style={{ maxWidth: "400px", margin: "0 auto" }}
        >
            <img className="w-100" src={notFound} alt="notFound" />
        </div>
    );
}

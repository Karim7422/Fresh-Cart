import React, { useContext, useState } from "react";
import Button from "../../../ui/Button/Button";
import { UserContext } from "../../../../context/UserContext";
import Spinner from "../../../ui/Spinner/Spinner"
export default function ForgetPassword() {
    const { forgotPassword, confirmResetCode, resetPassword,loading } =
        useContext(UserContext);
    const [message, setMessage] = useState(null);
    const [email, setEmail] = useState("");
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const res =
            message?.status === "success"
                ? message?.data?.data?.status === "Success"
                    ? await resetPassword(Object.fromEntries(formData))
                    : await confirmResetCode(Object.fromEntries(formData).resetCode)
                : message?.data?.response?.data.message === "Reset code is invalid or has expired"
                    ? await confirmResetCode(Object.fromEntries(formData).resetCode)
                    : await forgotPassword(Object.fromEntries(formData).email);
        setMessage(res);
    }
    return (
        <section className="w-50 m-auto bg-main-light p-5 mt-4">
            <h3 className="text-center fw-bold">Forget Password</h3>
            <form onSubmit={handleSubmit}>
                {message?.status !== "success" &&
                    message?.data?.response?.data.message !==
                    "Reset code is invalid or has expired" && (
                        <div>
                            <label className="fw-bold my-2" htmlFor="email">Enter Your Email</label>
                            <input
                                className="form-control"
                                name="email"
                                type="email"
                                id="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    )}
                {((message?.status === "success" &&
                    message?.data?.data?.message === "Reset code sent to your email") ||
                    message?.data?.response?.data.message ===
                    "Reset code is invalid or has expired") && (
                        <div>
                            <label className="fw-bold my-2" htmlFor="resetCode">Enter Reset Code</label>
                            <input
                                className="form-control"
                                name="resetCode"
                                type="number"
                                id="resetCode"
                                placeholder="Reset Code"
                                required
                            />
                        </div>
                    )}
                {message?.status === "success" &&
                    message?.data?.data?.status === "Success" && (
                        <div>
                            <input type="text" defaultValue={email} name="email" hidden />
                            <label className="fw-bold my-2" htmlFor="newPassword">Enter New Password</label>
                            <input
                                className="form-control"
                                name="newPassword"
                                type="password"
                                id="newPassword"
                                placeholder="New Password"
                                required
                            />
                        </div>
                    )}
                {message?.status === "error" ? (
                    <p className="text-danger  fw-bolder text-center">
                        {message?.data?.response?.data?.message}
                    </p>
                ) : (
                    <p className=" text-main fw-bolder text-center my-3">
                        {message?.data?.data?.message}
                    </p> 
                )}
                {message?.data?.data?.token && (
                            <div className="text-center">
                                <p className="text-main fw-bolder">Your Password has been reset successfully</p>
                                <Button type="link" to="/login" className="fw-semibold my-2 d-block">
                                    Login now
                                </Button>
                            </div>
                        )}
                <Button  type="submit">Submit</Button>
            </form>
            {loading&&<Spinner/>}
        </section>
    );
}

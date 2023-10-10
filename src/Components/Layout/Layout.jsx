import React, { useContext, useEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { UserContext } from "../../context/UserContext";
import Spinner from "../ui/Spinner/Spinner";
export default function Layout() {
  const { setUserToken } = useContext(UserContext);
  const { state } = useNavigation();

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken();
    }
  }, [setUserToken]);
  return (
    <>
      <Navbar />
      {state === "loading" && <Spinner />}
      {state === "idle" && <Outlet />}
    </>
  );
}

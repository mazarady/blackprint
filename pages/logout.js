import { useEffect, useContext } from "react";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

const Logout = () => {
  const { logoutUser } = useContext(AuthContext);
  const loggingOut = async () => {
    try {
      await fetch("/api/logout");
      logoutUser();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loggingOut();
  }, []);
  return <div></div>;
};

export default Logout;

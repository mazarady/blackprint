import { useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Head from "next/head";

const Logout = () => {
  const { user, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    loggingOut();
  }, []);

  const loggingOut = async () => {
    try {
      await fetch("/api/logoutapi");
      logoutUser();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Head>
      <title>Logout</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};

export default Logout;

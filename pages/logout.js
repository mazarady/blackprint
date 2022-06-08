import { useEffect } from "react";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    destroyCookie(null, "jwt");
    router.push("/");
  });
  return <div></div>;
};

export default Logout;

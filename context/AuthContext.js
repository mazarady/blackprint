import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const res = await fetch("/api/getuser");
      const json = await res.json();
      const { username, id } = json;
      if (res.status == 200 && username) {
        setUser({ username });
        setUserID({ id });
      }
    } catch (err) {}
  };

  const loginUser = async (username, id) => {
    try {
      setUser({ username });
      setUserID({ id });
      router.back();
    } catch (err) {
      setUser(null);
    }
  };

  const registerUser = async (username, id) => {
    try {
      setUser({ username });
      setUserID({ id });
      router.push("/");
    } catch (err) {
      setUser(null);
    }
  };

  const logoutUser = async () => {
    try {
      router.push("/");
      setUser(null);
      setUserID(null);
    } catch (err) {}
  };

  return (
    <AuthContext.Provider
      value={{ user, loginUser, logoutUser, registerUser, userID }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

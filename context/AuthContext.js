import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from 'nookies'

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const router = useRouter();


  useEffect(() => {
    checkUserLoggedIn();
  }, []);


  const checkUserLoggedIn = async () => {
    try {
      const res = await fetch('/api/getuser');
      const json = await res.json();
      const { username } = json;
      if(res.status == 200) {
        setUser({ username });
      }
    }
    catch(err) {
    }
  }

  const loginUser = async (username) => {
    try {
      setUser({ username });
      router.push('/');
    }
    catch(err) {
      setUser(null);
    }

  };

  const logoutUser = async () => {
    try {
      router.push('/')
      setUser(null);
    }
    catch(err) {
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;


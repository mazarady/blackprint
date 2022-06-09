import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from 'nookies'

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const router = useRouter();


  const checkUserLoggedIn = async () => {
    try {
      const res = await fetch('/api/getuser');
      console.log(res);
      const json = await res.json();
      if(res.status == 200) {
        console.log('here');
        loginUser(json.username);
      }
      else {
        loginUser('');
      }
    }
    catch(err) {
    }
  }

  useEffect(() => {
    checkUserLoggedIn();
  }, [])

  const loginUser = async (email) => {
    try {
      setUser({ email });
      router.push("/");
    }
    catch(err) {
      setUser(null);
    }

  };

  const logoutUser = async () => {
    try {
      setUser(null);
      router.push('/');
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


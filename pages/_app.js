import "../styles/globals.css";
import Nav from "../components/Nav";
import { useRouter } from "next/router";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AuthProvider>
      {router.pathname != "/register" && router.pathname != "/login" && <Nav />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;

import Portal from "../components/Portal";
import LoginForm from "../components/LoginForm";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Portal header="Login to Your Account">
        <LoginForm />
      </Portal>
    </>
  );
}

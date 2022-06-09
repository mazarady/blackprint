import Modal from "../components/Modal";
import LoginForm from "../components/LoginForm";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Modal header="Login" open={true}>
        <LoginForm />
      </Modal>
    </>
  );
}

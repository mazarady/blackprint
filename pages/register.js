import Modal from "../components/Modal";
import RegisterForm from "../components/RegisterForm";
import Head from "next/head";

export default function Register() {
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Modal header="Register" open={true}>
        <RegisterForm />
      </Modal>
    </>
  );
}

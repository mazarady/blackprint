import Modal from "../components/Modal";
import LoginForm from "../components/LoginForm";
import { NavModalContext } from "../components/context/NavModalContext";
import { useState } from "react";

export default function Login() {
  return (
    <Modal header="Login" open={true}>
      <LoginForm />
    </Modal>
  );
}

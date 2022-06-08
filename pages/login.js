import Modal from "../components/Modal";
import LoginForm from "../components/LoginForm";
import { NavModalContext } from "../components/context/NavModalContext";
import { useState } from "react";

export default function Login() {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div>
      <NavModalContext.Provider value={{ modalOpen, setModalOpen }}>
        <Modal header="Login">
          <LoginForm />
        </Modal>
      </NavModalContext.Provider>
    </div>
  );
}

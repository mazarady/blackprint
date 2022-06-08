import Modal from "../components/Modal";
import RegisterForm from "../components/RegisterForm";
import { NavModalContext } from "../components/context/NavModalContext";
import { useState } from "react";

export default function Register() {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div>
      <NavModalContext.Provider value={{ modalOpen, setModalOpen }}>
        <Modal header="Register">
          <RegisterForm />
        </Modal>
      </NavModalContext.Provider>
    </div>
  );
}

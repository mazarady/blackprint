import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import Modal from "../components/Modal";
import { NavModalContext } from "../components/context/NavModalContext";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <NavModalContext.Provider value={{ modalOpen, setModalOpen }}>
        <Nav />
        <Modal header="Register">
          <RegisterForm />
        </Modal>
      </NavModalContext.Provider>
    </div>
  );
};

export default Home;

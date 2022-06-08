import Modal from "../components/Modal";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <Modal header="Register" open={true}>
      <RegisterForm />
    </Modal>
  );
}

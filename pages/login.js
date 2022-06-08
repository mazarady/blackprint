import Modal from "../components/Modal";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <Modal header="Login" open={true}>
      <LoginForm />
    </Modal>
  );
}

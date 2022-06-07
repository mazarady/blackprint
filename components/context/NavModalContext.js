import { createContext } from "react";
export const NavModalContext = createContext({
  modalOpen: false,
  setModalOpen: (modal) => {},
});

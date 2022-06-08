import styled from "styled-components";
import { H5 } from "./Headers";
import { useContext } from "react";
import { NavModalContext } from "./context/NavModalContext";

const Wrapper = styled.div`
  z-index: 4000;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  max-width: 400px;
  width: 100%;
  border-radius: 16px;
  padding: 35px 20px;
  display: grid;
  align-content: center;
  grid-template-rows: max-content max-content;
  h5 {
    padding-bottom: 30px;
    text-align: center;
  }
`;

const Blur = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: rgba(76, 145, 149);
`;

const CloseButton = styled.div`
  right: 25px;
  top: 10px;
  font-size: 24px;
  color: black;
  font-family: "Karla", sans-serif;
  position: absolute;
  cursor: pointer;
`;

export default function Modal({ children, header }) {
  const { modalOpen, setModalOpen } = useContext(NavModalContext);
  const handleLogin = () => setModalOpen(true);
  const handleLogout = () => setModalOpen(false);

  return (
    modalOpen && (
      <Blur>
        <Wrapper>
          <H5>{header}</H5>
          {/* <CloseButton
            onClick={() => {
              handleLogout();
            }}
          >
            x
          </CloseButton> */}
          {children}
        </Wrapper>
      </Blur>
    )
  );
}

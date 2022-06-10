import styled from "styled-components";
import { H5 } from "./Headers";

const Wrapper = styled.div`
  z-index: 4000;
  background-color: white;
  display: grid;
  align-content: center;
  grid-template-rows: max-content max-content;
  h5 {
    padding-bottom: 30px;
    text-align: center;
    color: #4C9194;
  }
  max-width: 400px;
  padding: 35px 20px;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  width: 100%;
  border-radius: 16px;

  @media (min-width: 960px){
    position: relative;
    max-width: initial;
    top: initial;
    right: initial;
    transform: initial;
    width: initial;
    border-radius: initial;
    height: 100%;
    float: right;
    width: 50vw;
    padding: 10vw;
  }
`;

const Blur = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  opacity: 0.8;
  background-color: #4C9194;
  @media (min-width: 960px){
    background-color: #e5e5f7;
    background-image:  linear-gradient(135deg, #4C9194 25%, transparent 25%), linear-gradient(225deg, #4C9194 25%, transparent 25%), linear-gradient(45deg, #4C9194 25%, transparent 25%), linear-gradient(315deg, #4C9194 25%, #e5e5f7 25%);
    background-position:  10px 0, 10px 0, 0 0, 0 0;
    background-size: 20px 20px;
    background-repeat: repeat;
  }

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

export default function Modal({ children, header, open }) {
  return (
    open && (
      <Blur>
        <Wrapper>
          <H5>{header}</H5>
          {children}
        </Wrapper>
      </Blur>
    )
  );
}

import styled from "styled-components";

const StyledButton = styled.button`
  color: black;
  height: 60px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
  font-family: "Karla", sans-serif;
  border: 0px;
  position: relative;
  text-align: center;
  font-weight: 600;
  width: 200px;
`;

export default function Button({ text }) {
  return <StyledButton>{text}</StyledButton>;
}

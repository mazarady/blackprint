import styled from "styled-components";

const Input = styled.input`
  height: 60px;
  border-radius: 4px;
  border: ${(props) => (props.color ? "1px solid gray" : "0px")};
  padding-left: 20px;
  font-size: 20px;
  font-family: "Karla", sans-serif;
  background-color: ${(props) => (props.color ? props.color : "#222222")};
  color: #878787;
  outline: none;
`;

export default Input;

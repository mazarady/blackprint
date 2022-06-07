import styled from "styled-components";

const Button = styled.button`
  height: 40px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 20px;
  font-family: "Karla", sans-serif;
  border: 1px solid gray;
  margin-top: 10px;
  transition: all 200ms ease-in-out;
  &:hover {
    background-color: rgba(95, 179, 184);
    color: white;
    border: 1px solid white;
  }
`;

export default function FormButton() {
  return <Button type="submit">Submit</Button>;
}

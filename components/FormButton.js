import styled from "styled-components";

const Button = styled.button`
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
  background: linear-gradient(
    315deg,
    rgb(236, 160, 255),
    rgb(170, 178, 255),
    rgb(132, 255, 201)
  );
`;

const Arrow = styled.div``;

export default function FormButton({ text }) {
  return <Button type="submit">{text}</Button>;
}

import styled from "styled-components";

const StyledAnchor = styled.a`
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
  background: #3f3343;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 30px;
  color: white;
  transition: background 200ms ease-in-out;
  &:hover {
    color: #3f3343;
    background: rgb(239, 239, 239);
  }
}
`;

export default function AnchorText({ text, id }) {
  return <StyledAnchor href={`#${id}`}>{text}</StyledAnchor>;
}

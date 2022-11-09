import styled from "styled-components";

const StyledOutput = styled.div`
  height: 200px;
  width: 566px;
  border-radius: 6px;
  font-family: 'Karla';
  font-size: 16px;
  padding: 0px 15px;
  border: 1px solid black;
  margin: 10px 0px;
  background: #1E293B;
  color: #22C55E;

`;

export default function Output({ children }) {
  return (
    <StyledOutput>
      <pre>{children}</pre>
    </StyledOutput>
  );
}

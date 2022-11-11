import styled from "styled-components";
import { GrayBar } from "./GrayBar";

const StyledOutput = styled.div`
  height: 210px;
  width: 920px;
  border-radius: 0px 0px 6px 6px;
  font-family: "Karla";
  font-size: 16px;
  padding: 0px 15px;
  border: 1px solid black;
  background: #252620;
  color: ${({ error }) => (error ? "red" : "#D5D1CB")};
  overflow-y: scroll;
`;

export default function Output({ error, processing, children }) {
  return (
    <div style={{ margin: "30px 0px 0px" }}>
      <GrayBar>
        Terminal{" "}
        {processing && (
          <img
            style={{ width: "25px", marginLeft: "2px" }}
            src="/blocks.svg"
            alt="Loading"
          />
        )}
      </GrayBar>
      <StyledOutput error={error}>
        <pre>{children}</pre>
      </StyledOutput>
    </div>
  );
}

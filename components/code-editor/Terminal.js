import styled from "styled-components";
import { GrayBar } from "./GrayBar";

const StyledTerminal = styled.div`
  height: ${({prompt}) => prompt ? '780px': '190px'};
  border-radius: 0px 0px 6px 6px;
  font-family: "Karla";
  font-size: 16px;
  padding: 0px 15px;
  border: 1px solid black;
  background: #252620;
  color: ${({ error }) => (error ? "red" : "#D5D1CB")};
  overflow-y: scroll;
`;

export default function Terminal({ prompt, terminal, hideTerminal, error, processing, children }) {
  return (
    <div style={{ margin: prompt ? '': "30px 0px 0px", display: terminal ? 'none': 'block' }}>
      <GrayBar>
        <img src="./close.png" onClick={() => {hideTerminal(true)}}/>
        <span className='terminal'>Terminal{" "}
        {processing && (
          <img
            style={{ width: "25px", marginLeft: "2px" }}
            src="/blocks.svg"
            alt="Loading"
          />
        )}</span>
      </GrayBar>
      <StyledTerminal error={error} prompt={prompt}>
        <pre>{children}</pre>
      </StyledTerminal>
    </div>
  );
}

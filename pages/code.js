import Head from "next/head";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import Output from "../components/code-editor/Output";
import { H5 } from "../components/Headers";
import styled from "styled-components";

const StyledRight = styled.div``;

const StyledH5 = styled(H5)`
  font-weight: 600;
`;

const SectionWrapper = styled.section`
  display: grid;
  grid-template-columns: 1100px max-content;
  grid-column-gap: 15px;
  justify-content: center;
`;

const StyleButton = styled.button`
  height: 50px;
  background-color: white;
  padding: 0px 10px;
  font-family: "Karla";
  height: 40px;
  border-radius: 6px;
  border: 1px solid black;
  margin: 15px 0px 0px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 200ms ease-in-out;
  &:hover {
    background-color: #1e293b;
    color: white;
  }
`;

export default function Code({ data }) {
  const [output, setOutput] = useState(null);
  const [sourceCode, setSourceCode] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [error, setError] = useState(false);

  const handleCompile = async (e) => {
    setProcessing(true);
    e.preventDefault();
    const res = await fetch("/api/compile", {
      method: "POST",
      body: JSON.stringify(sourceCode),
    });
    if (res.status == 200) {
      const data = await res.json();
      console.log(data);
      setOutput(data);
      setProcessing(false);
      setError(false);
    } else {
      const error = await res.json();
      setError(true);
      setOutput(error);
      setProcessing(false);
    }
  };

  return (
    <SectionWrapper>
      <Head>
        <title>Code Editor</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <Editor
          height="100%"
          width={`100%`}
          theme="vs-dark"
          defaultLanguage="python"
          defaultValue="# some comment"
          onChange={(e) => {
            setSourceCode(e);
          }}
        />
      </div>
      <StyledRight>
        <div className="output">
          <StyledH5>Output</StyledH5>
          <Output error={error}>{output && output}</Output>
        </div>
        <div
          className="input-compile"
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          <textarea
            rows="5"
            placeholder="Custom Input (optional)"
            onChange={(e) => {
              setCustomInput(e.target.value);
            }}
            style={{ width: "100%" }}
          ></textarea>
          <div style={{ float: "right" }}>
            <StyleButton onClick={handleCompile}>
              {" "}
              {processing ? "Processing..." : "Compile and Execute"}
            </StyleButton>
          </div>
        </div>
      </StyledRight>
    </SectionWrapper>
  );
}

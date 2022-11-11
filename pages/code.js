import Head from "next/head";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { useState } from "react";
import Output from "../components/code-editor/Output";
import QuestionVideoWrapper from "../components/code-editor/QuestionVideoWrapper";
import { H5 } from "../components/Headers";
import styled from "styled-components";

const StyledRight = styled.div``;

const StyledH5 = styled(H5)`
  font-weight: 600;
`;

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: row-reverse;
  gap: 30px;
  align-items: flex-end;
  justify-content: center;
  padding: 20px;
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
  const [output, setOutput] = useState("");
  const [sourceCode, setSourceCode] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [error, setError] = useState("");

  const handleCompile = (e) => {
    setProcessing(true);
    e.preventDefault();
    const formData = {
      language_id: "71",
      // encode source code in base64
      source_code: btoa(sourceCode),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: process.env.NEXT_PUBLIC_RAPID_API_URL + "/?wait=true",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
      data: formData,
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        if (response.data.stderr) {
          setOutput(response.data.stderr);
          setError(true);
        } else {
          setOutput(response.data.stdout);
          setError(false);
        }

        setProcessing(false);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        setError(true);
        setOutput(error);
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  return (
    <SectionWrapper>
      <Head>
        <title>Code Editor</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div
        style={{
          alignSelf: "start",
          borderRadius: "6px",
          height: "840px",
          width: "920px",
        }}
      >
        <Editor
          height="100%"
          width="100%"
          theme="vs-dark"
          defaultLanguage="python"
          defaultValue="# some comment"
          onChange={(e) => {
            setSourceCode(e);
          }}
          options={{
            fontSize: "16px",
          }}
        />
        <div style={{ float: "right" }}>
          <StyleButton onClick={handleCompile}>
            {" "}
            {processing ? "Processing..." : "Compile and Execute"}
          </StyleButton>
        </div>
      </div>
      <StyledRight>
        <QuestionVideoWrapper />
        <div className="output">
          <Output error={error}>{output && atob(output)}</Output>
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
        </div>
      </StyledRight>
    </SectionWrapper>
  );
}

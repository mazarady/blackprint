import Head from "next/head";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { useState } from "react";
import Output from "../components/code-editor/Output";
import QuestionVideoWrapper from "../components/code-editor/QuestionVideoWrapper";
import styled, { css } from "styled-components";
import { GrayBar } from "../components/code-editor/GrayBar";

const StyledRight = styled.div``;

const EditorCodeFooter = styled.div`
  width: 100%;
  background: #1e1e1e;
  border-top: 0.5px solid white;
  display: flex;
  justify-content: end;
  padding: 10px 16px;
`;

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: row-reverse;
  gap: 30px;
  align-items: start;
  justify-content: center;
  padding: 20px;
  textarea {
    resize: none;
  }
`;

const StyleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  width: 120px;
  padding: 4px 0px;
  font-size: 18px;
  line-height: 1;
  user-select: none;
  transition: all 0.2s ease 0s;
  border-radius: 2px;
  cursor: ${({ processing }) => (processing ? "initial" : "pointer")};
  color: rgb(255, 255, 255);
  background-color: ${({ processing }) =>
    processing ? "gray" : "rgb(0, 196, 154)"};
  border: 0px;
  height: 30px;
  font-family: monospace;

  .play {
    background-image: url("./play.png");
    width: 18px;
    margin-right: 5px;
    height: 18px;
    background-size: contain;
  }

  ${({ processing }) => {
    if (!processing) {
      return css`
        &:hover {
          background-color: #97e7d5;
          color: #159b77;

          .play {
            background-image: url("./play-hover.png");
          }
        }
      `;
    }
  }}
`;

export default function Code({ data }) {
  const [output, setOutput] = useState("");
  const [sourceCode, setSourceCode] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [showInput, setShowInput] = useState(false);
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
          height: "870px",
          width: "920px",
        }}
      >
        <GrayBar>Editor</GrayBar>
        <Editor
          height="90%"
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
        <EditorCodeFooter style={{ width: "100%" }}>
          <StyleButton onClick={handleCompile} processing={processing}>
            <div className="play"></div>
            run
          </StyleButton>
        </EditorCodeFooter>
      </div>
      <StyledRight>
        <QuestionVideoWrapper />
        <div className="output">
          <Output error={error} processing={processing}>
            {output && atob(output)}
          </Output>
        </div>
        <small
          style={{
            cursor: "pointer",
            fontFamily: "monospace",
            fontSize: "13.5px",
            margin: "5px 0px",
            display: "block",
            width: "fit-content",
          }}
          onClick={() => setShowInput(!showInput)}
        >
          {showInput ? "- hide input" : "+ add input"}
        </small>
        {showInput && (
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
              value={customInput}
              style={{ width: "100%" }}
            ></textarea>
          </div>
        )}
      </StyledRight>
    </SectionWrapper>
  );
}

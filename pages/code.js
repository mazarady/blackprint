import Head from "next/head";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { useState, useEffect } from "react";
import Output from "../components/code-editor/Output";
import QuestionVideoWrapper from "../components/code-editor/QuestionVideoWrapper";
import styled, { css } from "styled-components";
import { GrayBar } from "../components/code-editor/GrayBar";
import Router from "next/router";

const StyledRight = styled.div`
  width: 100%;
`;

const EditorCodeFooter = styled.div`
  width: 100%;
  background: #1e1e1e;
  border-top: 0.5px solid white;
  display: flex;
  justify-content: end;
  gap: 15px;
  padding: 10px 16px;
  border-radius: 0px 0px 5px 5px;
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
  width: auto;
  padding: 4px 10px;
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
  const [sourceCode, setSourceCode] = useState("# Print Hello World");
  const [processing, setProcessing] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let queryParam = params.get("source_code");

    const fetchSourceCode = async (queryParam) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: queryParam }),
      };
      try {
        const res = await fetch("/api/getsourcecode", requestOptions);
        const { data } = await res.json();
        return data;
      } catch (err) {
        return;
      }
    };

    // call the function
    if (queryParam) {
      fetchSourceCode(queryParam)
        .then((savedSourceCode) => {
          if (savedSourceCode) {
            const base64 = atob(savedSourceCode);
            setSourceCode(base64);
          } else {
            return;
          }
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  }, []);

  const generateUrl = async () => {
    const hashedSourceCode = btoa(sourceCode);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: hashedSourceCode }),
    };
    const res = await fetch("/api/generateurl", requestOptions);
    const { data } = await res.json();
    const encodedKey = data;
    const navigationResult = await Router.push({
      pathname: "/code",
      query: { source_code: encodeURI(encodedKey) },
    });

    navigator.clipboard.writeText(window.location.href);
    alert("Copied the text: " + window.location.href);
  };

  const handleCompile = (e) => {
    setProcessing(true);
    e.preventDefault();
    const formData = {
      language_id: "71",
      // encode source code in base64
      // we import from __future__ import annotations because of weird type errors we were seeing
      source_code: btoa("from __future__ import annotations\n" + sourceCode),
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
          width: "100%",
        }}
      >
        <GrayBar>Editor</GrayBar>
        <Editor
          height="90%"
          width="100%"
          theme="vs-dark"
          defaultLanguage="python"
          defaultValue="# some comment"
          value={sourceCode}
          onChange={(e) => {
            setSourceCode(e);
          }}
          options={{
            fontSize: "16px",
          }}
        />
        <EditorCodeFooter style={{ width: "100%" }}>
          <StyleButton onClick={generateUrl}>share code</StyleButton>
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

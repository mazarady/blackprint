import Head from "next/head";
import Editor from "@monaco-editor/react";
import axios from "axios";
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
      url: process.env.NEXT_PUBLIC_RAPID_API_URL,
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
        console.log("res.data", response.data);
        const token = response.data.token;
        fetchOutput(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
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

  const fetchOutput = async (token) => {
    const options = {
      method: "GET",
      url: process.env.NEXT_PUBLIC_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        console.log("response.data", response.data);
        setOutput(response.data.stdout);
        return;
      }
    } catch (err) {
      setProcessing(false);
      console.log("err", err);
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
          defaultValue="// some comment"
          onChange={(e) => {
            setSourceCode(e);
          }}
        />
      </div>
      <StyledRight>
        <div className="output">
          <StyledH5>Output</StyledH5>
          <Output>{output && atob(output)}</Output>
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

import Head from "next/head";
import nookies from "nookies";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { useState, useEffect, useRef, useContext } from "react";
import Terminal from "../../../../../components/code-editor/Terminal";
import Prompt from "../../../../../components/code-editor/Prompt";
import { GrayBar } from "../../../../../components/code-editor/GrayBar";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import usePrevious from "../../../../../lib/usePrevious";
import { getCodeData } from "../../../../../lib/courseHelpers";
import "react-toastify/dist/ReactToastify.css";
import JSZip from "jszip";
import AuthContext from "../../../../../context/AuthContext";
import {
  StyledRight,
  EditorCodeFooter,
  SectionWrapper,
  StyleButton,
  StyledCollapse,
  SaveState,
  TestResultsWrapper,
  StyledNav,
  StyledNavButton,
} from "../../../../../components/code-editor/others";
import { getUserSubmission } from "../../../../../lib/getusersubmission";

export default function Code({ labAttrs, labId, userSubmission, cookies }) {
  const {
    data: {
      attributes: { url },
    },
  } = labAttrs.testfile;

  const { user } = useContext(AuthContext);
  const [output, setOutput] = useState("");
  const [sourceCode, setSourceCode] = useState(userSubmission);
  const [processing, setProcessing] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState("");
  const [prompt, hidePrompt] = useState(false);
  const [terminal, hideTerminal] = useState(false);
  const [editor, hideEditor] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const [encodedZipFile, setEncodedZipFile] = useState("");
  const editorRef = useRef(null);
  const [saveLoading, setSaveLoading] = useState(false);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const CopyLinkMessage = ({ link }) => (
    <span>🦄 Yay! Copied to clipboard</span>
  );

  // Share Code Logic -- need to fix edge case when user saves coded and shares it.
  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   let queryParam = params.get("source_code");

  //   const fetchSourceCode = async (queryParam) => {
  //     const requestOptions = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ data: queryParam }),
  //     };
  //     try {
  //       const res = await fetch("/api/getsharedcode", requestOptions);
  //       const { data } = await res.json();
  //       return data;
  //     } catch (err) {
  //       console.log(err);
  //       return;
  //     }
  //   };

  //   // call the function
  //   if (queryParam) {
  //     fetchSourceCode(queryParam)
  //       .then((savedSourceCode) => {
  //         if (savedSourceCode) {
  //           const base64 = atob(savedSourceCode);
  //           setSourceCode(base64);
  //         } else {
  //           return;
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         return;
  //       });
  //   }
  // }, []);

  useEffect(() => {
    createFile(url);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let queryParam = params.get("source_code");
    if (queryParam) return;

    const delayDebounceFn = setTimeout(async () => {
      if (!user) return;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lab: labId,
          username: user.username,
          jwt: cookies.jwt,
          sourceCode: sourceCode,
        }),
      };
      const req = await fetch("/api/saveusersubmission", requestOptions);
      if (req.status === 200) {
        setSaveLoading(false);
      }
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [sourceCode]);

  const reader = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.readAsDataURL(file);
    });
  };
  const readFile = (file) => {
    reader(file).then((result) => {
      // console.log(result.split(","));
      // setEncodedZipFile(result.split(",")[1]);
      let parsed = result.split(",");
      const testCases = atob(parsed[1]).split("#break");
      setTestCases(testCases);
    });
  };

  const createFile = async (testfile) => {
    let response = await fetch(testfile);
    let data = await response.blob();

    let metadata = {
      type: "text",
    };
    let file = new File([data], "test.py", metadata);
    readFile(file);
    // ... do something with the file or return it

    // console.log(data);
    // var zip = new JSZip();
    // zip.loadAsync(data /* = file blob */).then(
    //   function (zip) {
    //     // process ZIP file content here
    //     const readFile = zip.file("hello.py").async("string"); // a promise of "Hello World\n"
    //     console.log(readFile);
    //   },
    //   function () {}
    // );
  };

  const shareUrl = async () => {
    const hashedSourceCode = btoa(sourceCode);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: hashedSourceCode }),
    };
    const res = await fetch("/api/generateurl", requestOptions);
    const { data } = await res.json();
    const encodedKey = data;
    const asPath = Router.asPath.split("?")[0];
    const navigationResult = await Router.push({
      pathname: asPath,
      query: { source_code: encodeURI(encodedKey) },
    });

    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success(<CopyLinkMessage link={window.location.href} />, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      })
      .catch(() => {
        toast.error("Oh no. Something went wrong.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      });
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
          setOutput(atob(response.data.stderr));
          setError(true);
        } else {
          setOutput(atob(response.data.stdout));
          setError(false);
        }

        setProcessing(false);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        setError(true);
        setOutput(atob(error));
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

  const genTestTokens = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const langId = "71";
    // loop through test cases
    // have a variable that combines user source_code with test case code
    // pass that variable in to source_code attribute
    // stdin stays the same
    // pass that as an array of objects to batch url
    const testCasesWithoutGlobals = testCases.slice(1);
    const globals = testCases[0];
    const arrayOfFormData = testCasesWithoutGlobals.map((testCase) => {
      return {
        language_id: langId,
        // encode source code in base64
        // we import from __future__ import annotations because of weird type errors we were seeing
        source_code: btoa(
          "from __future__ import annotations\n" +
            globals +
            sourceCode +
            "\n" +
            testCase
        ),
        stdin: btoa(customInput),
      };
    });

    const options = {
      method: "POST",
      url: process.env.NEXT_PUBLIC_RAPID_API_URL + "/batch",
      params: { base64_encoded: "true" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
      data: {
        submissions: arrayOfFormData,
      },
    };

    // FOR ADDITIONAL FILES

    // const testFormData = {
    //   language_id: langId,
    //   // encode source code in base64
    //   // we import from __future__ import annotations because of weird type errors we were seeing
    //   source_code: btoa("from __future__ import annotations\n" + sourceCode),
    //   additional_files:
    //     "UEsDBBQACAAIADGZblUAAAAAAAAAAC0AAAAIACAAaGVsbG8ucHlVVA0AB+4Cc2P6AnNj+gJzY3V4CwABBPcBAAAEFAAAAEtJTVPISM3JyS/PL8pJ0dC04lJQKCjKzCvRUC/Ih4AChbTE5FR1TS4uAFBLBwiH1UL6KgAAAC0AAABQSwMEFAAIAAgAMZluVQAAAAAAAAAAsAAAABMAIABfX01BQ09TWC8uX2hlbGxvLnB5VVQNAAfuAnNj+gJzYwQDc2N1eAsAAQT3AQAABBQAAABjYBVjZ2BiYPBNTFbwD1aIUIACkBgDJxAbAXEdEIP4GxiIAo4hIUFQJkjHAiAWQFPCiBCXSs7P1UssKMhJ1ctJLC4pLU5NSUksSVUOCAYp/MVUnAyib+jpglzDAABQSwcIatwi/V0AAACwAAAAUEsBAhQDFAAIAAgAMZluVYfVQvoqAAAALQAAAAgAIAAAAAAAAAAAAKSBAAAAAGhlbGxvLnB5VVQNAAfuAnNj+gJzY/oCc2N1eAsAAQT3AQAABBQAAABQSwECFAMUAAgACAAxmW5Vatwi/V0AAACwAAAAEwAgAAAAAAAAAAAApIGAAAAAX19NQUNPU1gvLl9oZWxsby5weVVUDQAH7gJzY/oCc2MEA3NjdXgLAAEE9wEAAAQUAAAAUEsFBgAAAAACAAIAtwAAAD4BAAAAAA==",
    //   stdin: btoa(customInput),
    // };

    // const testOptions = {
    //   method: "POST",
    //   url: process.env.NEXT_PUBLIC_RAPID_API_URL + "/?wait=true",
    //   params: { base64_encoded: "true", fields: "*" },
    //   headers: {
    //     "content-type": "application/json",
    //     "Content-Type": "application/json",
    //     "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
    //     "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    //   },
    //   data: testFormData,
    // };

    const response = await axios.request(options);
    if (response.data.stderr) return;

    try {
      const submissions = await getTestResults(response.data);
      const renderedOutput = renderTestResults(submissions);
      setOutput(renderedOutput);
      setProcessing(false);
    } catch (err) {
      const error = err.response ? err.response.data : err;
      setProcessing(false);
      let status = err.response.status;
      console.log("status", status);
      if (status === 429) {
        console.log("too many requests", status);
      }
      return;
    }
  };

  const renderNavButtons = () => {
    const NavButtons = [
      { text: "Prompt", fn: hidePrompt },
      { text: "Terminal", fn: hideTerminal },
      { text: "Editor", fn: hideEditor },
    ].map(({ text, fn }, index) => {
      return (
        <StyledNavButton
          key={index}
          onClick={() => fn((prevState) => !prevState)}
        >
          {text}
        </StyledNavButton>
      );
    });
    return <StyledNav>{NavButtons}</StyledNav>;
  };

  const getTestResults = async (tokens) => {
    function timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    let queryTokenParam = "";
    tokens.map(({ token }) => {
      queryTokenParam += token + ",";
    });
    const options = {
      method: "GET",
      url: process.env.NEXT_PUBLIC_RAPID_API_URL + "/batch",
      params: { base64_encoded: "true", tokens: queryTokenParam },
      headers: {
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
    };

    const response = await axios.request(options);
    let statusId = response.data.submissions[0].status?.id;
    // Processed - we have a result
    if (statusId === 1 || statusId === 2) {
      // still processing
      await timeout(2000);
      const newResponse = await getTestResults(tokens);
      return newResponse;
    } else {
      return response.data;
    }
  };

  const renderTestResults = ({ submissions }) => {
    const renderedOutput = submissions.map((testCase, index) => {
      const errorMessage = atob(testCase.stderr);
      if (errorMessage.includes("Assertion Error")) console.log(errorMessage);
      const {
        status: { description },
      } = testCase;
      if (description === "Accepted") {
        return (
          <li
            key={index}
            style={{
              color: "rgb(20, 251, 220)",
              listStyle: "none",
              width: "fit-content",
            }}
          >{`test_${index} [PASS]`}</li>
        );
      } else {
        return (
          <li
            key={index}
            style={{
              color: "rgb(255, 183, 107)",
              listStyle: "none",
            }}
          >
            <input
              id={`collapsible-${index}`}
              className="toggle"
              type="checkbox"
            />
            <label for={`collapsible-${index}`} className="lbl-toggle">
              {`test_${index} [FAIL]`}
              {/* <StyledCollapse></StyledCollapse> */}
            </label>
            <span
              style={{
                fontSize: "12px",
                display: "block",
                color: "#ff6d6b",
                whiteSpace: "pre-wrap",
              }}
              className="collapsible"
            >
              {errorMessage}
            </span>
          </li>
        );
      }
    });
    return <TestResultsWrapper>{renderedOutput}</TestResultsWrapper>;
  };

  return (
    <SectionWrapper>
      <Head>
        <title>Code Editor</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {renderNavButtons()}
      <div
        style={{
          alignSelf: "start",
          borderRadius: "6px",
          height: "870px",
          width: "100%",
          display: editor ? "none" : "initial",
          flex: "1",
        }}
      >
        <GrayBar>
          <img
            src="/close.png"
            onClick={() => {
              hideEditor(true);
            }}
          />
          Editor
        </GrayBar>

        <Editor
          height="90%"
          width="100%"
          theme="vs-dark"
          defaultLanguage="python"
          defaultValue='# print("hello world")'
          value={sourceCode}
          onChange={(e) => {
            setSaveLoading(true);
            setSourceCode(e);
          }}
          onMount={handleEditorDidMount}
          options={{
            fontSize: "16px",
          }}
        />
        <EditorCodeFooter style={{ width: "100%" }}>
          <SaveState saveLoading={saveLoading}>
            <span /> {saveLoading ? "saving" : "saved"}
          </SaveState>
          <div className="buttons">
            {/* <StyleButton onClick={shareUrl}>
              <div className="share"></div>
              share
            </StyleButton> */}
            <StyleButton onClick={genTestTokens} processing={processing}>
              <div className="test"></div>
              test
            </StyleButton>
            <StyleButton onClick={handleCompile} processing={processing}>
              <div className="play"></div>
              run
            </StyleButton>
          </div>
        </EditorCodeFooter>
      </div>
      <StyledRight>
        <Prompt
          terminal={terminal}
          prompt={prompt}
          hidePrompt={hidePrompt}
          title={labAttrs.title}
        />
        <div className="terminal">
          <Terminal
            prompt={prompt}
            terminal={terminal}
            hideTerminal={hideTerminal}
            error={error}
            processing={processing}
          >
            {output && output}
          </Terminal>
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
        <ToastContainer />
      </StyledRight>
    </SectionWrapper>
  );
}

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const { params } = ctx;
  const data = await getCodeData(params.slug, params.lab, cookies.jwt);
  const {
    data: { labData },
  } = data;

  const loginPage = {
    props: {},
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };

  const _404 = {
    props: {},
    redirect: {
      destination: "/404",
      permanent: false,
    },
  };

  if (!labData) return loginPage;

  if (labData.length != 0) {
    const {
      0: { id: labId, attributes: labAttrs },
    } = labData;
    const userSubmissionData = await getUserSubmission(
      labAttrs.title,
      cookies.jwt
    );
    const {
      data: { userSubmission },
    } = userSubmissionData;

    return {
      props: {
        labAttrs,
        labId,
        userSubmission,
        cookies,
      },
    };
  } else {
    return _404;
  }
}

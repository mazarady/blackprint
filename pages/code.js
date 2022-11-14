import Head from "next/head";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { useState, useEffect } from "react";
import Terminal from "../components/code-editor/Terminal";
import QuestionVideoWrapper from "../components/code-editor/QuestionVideoWrapper";
import styled, { css } from "styled-components";
import { GrayBar } from "../components/code-editor/GrayBar";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledRight = styled.div`
  width: 100%;
  flex: 1;
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
  flex-wrap: wrap;
  flex-direction: row-reverse;
  column-gap: 30px;
  align-items: start;
  justify-content: center;
  padding: 15px;
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

  .play,
  .share,
  .test {
    background-image: url("./play.png");
    width: 18px;
    margin-right: 5px;
    height: 18px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .share {
    background-image: url("./share.png");
    width: 16px;
  }

  .test {
    background-image: url("./test.png");
    width: 20px;
    margin-right: 2px;
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

          .share {
            background-image: url("./share-hover.png");
          }

          .test {
            background-image: url("./test-hover.png");
          }
        }
      `;
    }
  }}
`;

const StyledCollapse = styled.span`
  background: url("./collapse.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: 15px;
  height: 15px;
  display: inline-block;
  transform: rotate(180deg);
  cursor: pointer;
`;

const TestResultsWrapper = styled.div`
  input[type="checkbox"] {
    display: none;
  }
  .lbl-toggle {
    cursor: pointer;
    display: block;
  }

  .collapsible {
    max-height: 0px;
    overflow: hidden;
    transition: max-height 0.25s ease-in-out;
  }

  .toggle:checked + .lbl-toggle + .collapsible {
    max-height: 100px;
  }
`;

const StyledNav = styled.div`
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const StyledNavButton = styled.button`
  border: 0px;
  color: gray;
  font-family: monospace;
  cursor: pointer;
  font-size: 16px;
  letter-spacing: 0.5px;
  background: transparent;
  transition: color 200ms ease-in-out;
  &:hover {
    color: rgb(255, 183, 107);
  }
`;

export default function Code({ data }) {
  const [output, setOutput] = useState("");
  const [sourceCode, setSourceCode] = useState("# Print Hello World");
  const [processing, setProcessing] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState("");
  const [prompt, hidePrompt] = useState(false);
  const [terminal, hideTerminal] = useState(false);
  const [editor, hideEditor] = useState(false);

  const CopyLinkMessage = ({ link }) => (
    <span>🦄 Yay! Copied to clipboard</span>
  );

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
    const arrayOfExampleTestCases = [
      `\ndef test_is_even():\n  assert is_even(0)\n  assert not is_even(3)\n  assert not is_even(7)\n  assert is_even(14)\n  assert not is_even(397)\n  assert is_even(298)\n  assert not is_even(431)\n  assert is_even(876)\n  assert is_even(1000)\n  assert not is_even(1001)\n\n  assert not is_even(-3)\n  assert not is_even(-7)\n  assert is_even(-14)\n  assert not is_even(-397)\n  assert is_even(-298)\n  assert not is_even(-431)\n  assert is_even(-876)\n  assert is_even(-1000)\n  assert not is_even(-1001)\ntest_is_even()\n`,
      `\ndef test_is_odd():\n  assert not is_odd(0)\n  assert is_odd(3)\n  assert is_odd(7)\n  assert not is_odd(14)\n  assert is_odd(397)\n  assert not is_odd(298)\n  assert is_odd(431)\n  assert not is_odd(876)\n  assert not is_odd(1000)\n  assert is_odd(1001)\n\n  assert is_odd(-3)\n  assert is_odd(-7)\n  assert not is_odd(-14)\n  assert is_odd(-397)\n  assert not is_odd(-298)\n  assert is_odd(-431)\n  assert not is_odd(-876)\n  assert not is_odd(-1000)\n  assert is_odd(-1001)\ntest_is_odd()\n`,
      `\ndef test_merge_lists():\n  assert merge_lists([1,2,3,4], [5,6,7,8]) == [1,2,3,4,5,6,7,8]\n  assert merge_lists([], [5,6,7,8]) == [5,6,7,8]\n  assert merge_lists([1,2,3,4], []) == [1,2,3,4]\n  assert merge_lists([], []) == []\n  assert merge_lists([1], []) == [1]\n\n  # not lists of int but should still work\n  assert merge_lists([True, False], [True, False]) == [True, False, True, False]\n  assert merge_lists([["hello"], ["welcome"], ["to"]], ["blackprint"]) == [["hello"], ["welcome"], ["to"], "blackprint"]\n  assert merge_lists(["hello"], ["bye"]) == ["hello", "bye"]\ntest_merge_lists()\n`,
      `\ndef test_get_length():\n  assert get_length("hello") == 5\n  assert get_length([1,2,3,4,5,6,7]) == 7\n  assert get_length([]) == 0\n  assert get_length({}) == 0\n  assert get_length({1:2}) == 1\n  assert get_length("") == 0\n\n  assert get_length([(1,2,3)]) == 1\n  assert get_length(tuple()) == 0\n  assert get_length(set([1,2,3,4])) == 4\ntest_get_length()\n`,
      `\ndef test_match_state():\n  assert match_state("CA", ["Los Angeles, CA", "Brooklyn, NY", "Seattle, WA", "San Diego, CA"]) == ["Los Angeles, CA", "San Diego, CA"]\n  assert match_state("NY", ["Los Angeles, CA", "Brooklyn, NY", "Seattle, WA", "San Diego, CA"]) == ["Brooklyn, NY"]\n  assert match_state("AZ", ["Los Angeles, CA", "Phoenix, AZ", "Brooklyn, NY", "Seattle, WA", "San Diego, CA"]) == ["Phoenix, AZ"]\n  assert match_state("NY", ["Harlem, NY", "Brooklyn, NY", "Staten Island, NY", "Bronx, NY"]) == ["Harlem, NY", "Brooklyn, NY", "Staten Island, NY", "Bronx, NY"]\n  assert match_state("AZ", ["Los Angeles, CA", "Seattle, WA", "San Diego, CA"]) == []\n\n  assert match_state("WA", ["Los Angeles, CA", "Seattle, WA", "San Diego, CA"]) == ["Seattle, WA"]\n  assert match_state("OR", ["Los Angeles, CA", "Seattle, WA", "San Diego, CA"]) == []\n  assert match_state("MN", [""]) == []\n  assert match_state("", []) == []\ntest_match_state()\n`,
      `\ndef test_is_vowel():\n  assert is_vowel("a")\n  assert is_vowel("A")\n  assert is_vowel("e")\n  assert is_vowel("E")\n  assert is_vowel("i")\n  assert is_vowel("I")\n  assert is_vowel("o")\n  assert is_vowel("O")\n  assert is_vowel("u")\n  assert is_vowel("U")\n\n  assert not is_vowel("B")\n  assert not is_vowel("b")\n\n  assert not is_vowel("y")\n  assert not is_vowel("Y")\n\n  assert not is_vowel("D")\n  assert not is_vowel("d")\n\n  assert not is_vowel("%")\n  assert not is_vowel("(")\n\n  assert not is_vowel("!")\n  assert not is_vowel("?")\ntest_is_vowel()\n`,
      `import io\nimport sys\ndef test_print_all_vowels():\n  # Test case 1\n  capturedOutput = io.StringIO()\n  sys.stdout = capturedOutput\n  print_all_vowels("hello")\n  sys.stdout = sys.__stdout__\n  assert capturedOutput.getvalue() == "e\\no\\n", "error\\nmessage"\ntest_print_all_vowels()\n`,
    ];
    let arrayOfFormData = [];
    arrayOfFormData = arrayOfExampleTestCases.map((testCase) => {
      return {
        language_id: langId,
        // encode source code in base64
        // we import from __future__ import annotations because of weird type errors we were seeing
        source_code: btoa(
          "from __future__ import annotations\n" + sourceCode + "\n" + testCase
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
    ].map(({ text, fn }) => {
      return (
        <StyledNavButton onClick={() => fn((prevState) => !prevState)}>
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
            src="./close.png"
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
          <StyleButton onClick={generateUrl}>
            <div className="share"></div>
            share
          </StyleButton>
          <StyleButton onClick={genTestTokens}>
            <div className="test"></div>
            test
          </StyleButton>
          <StyleButton onClick={handleCompile} processing={processing}>
            <div className="play"></div>
            run
          </StyleButton>
        </EditorCodeFooter>
      </div>
      <StyledRight>
        <QuestionVideoWrapper
          terminal={terminal}
          prompt={prompt}
          hidePrompt={hidePrompt}
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

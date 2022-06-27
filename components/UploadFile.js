import { useState, useContext, useRef } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";
import Loading from "./loading";
import nookies from "nookies";

const MAX_SIZE = 20971520;

const HiddenInput = styled.input`
  display: none;
`;

const StyledSubmit = styled.input`
  background: transparent;
  padding: 15px;
  border-radius: 6px;
  font-family: "Karla", sans-serif;
  cursor: pointer;
  margin-top: 15px;
  width: 100%;
  border: 1px solid black;
  font-size: 16px;
  transition: all 200ms ease-in-out;
  &:hover {
    background-color: #fffbd6;
  }
`;

const Dropzone = styled.div`
  margin-top: 15px;
  height: auto;
  padding: 40px;
  background: ${(props) =>
    props.uploaded === "succ"
      ? "#C1E1C1"
      : props.uploaded === "err" || props.uploaded === "big"
      ? "#E1C1C1"
      : ""};
  width: 100%;
  opacity: 0.6;
  border: 2px dashed black;
  border-radius: 6px;
  display: block;
  cursor: pointer;
  color: black;
  div {
    text-align: center;
  }
`;

export default function UploadFile({ titleID, labID, jwt }) {
  const [file, setFileName] = useState(null);
  const [uploaded, setUploaded] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileAdded, setFileAdded] = useState(false);
  const { userID } = useContext(AuthContext);
  const hiddenInputRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (file) {
      let formData = new FormData();
      formData.append("files.file", file);
      formData.append(
        "data",
        JSON.stringify({
          user: userID,
          class: {
            id: titleID,
          },
          module: {
            id: labID,
          },
        })
      );
      setLoading(true);
      axios({
        method: "post",
        url: `${process.env.BASE_URL}/hws`,
        data: formData,
        headers:{
          Authorization: `Bearer ${jwt}`,
        }
      })
        .then(({ data }) => {
          setUploaded("succ");
          setFileAdded(false);
          setLoading(false);
        })
        .catch((error) => {
          setUploaded("err");
          setFileAdded(false);
          setLoading(false);
        });
    }
    else {
      setUploaded('no-file')
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const size = files[0].size;
    if (files[0] && size < MAX_SIZE) {
      setFileName(files[0]);
      setFileAdded(true);
      setUploaded("");
    }
    else if (size >= MAX_SIZE) {
      setUploaded("big");
    }
  };

  const handleOnDragOver = (event) => {
    event.preventDefault();
  };

  const handleOnDragLeave = (event) => {
    event.preventDefault();
  };

  const renderText = () => {
    if (fileAdded) {
      return file.name;
    } else if (uploaded === "succ") {
      return `${file.name} succesfully uploaded`;
    } else if (uploaded === "err") {
      return `File format not supported`;
    } else if (uploaded === "big") {
      return `File size too big`;
    }
    else if (uploaded === 'no-file') {
      return `Add a file by either Drag 'n' drop, or click to select file`
    }
    else {
      return `Drag 'n' drop zipped file here, or click to select file`;
    }
  };

  return (
    <>
      <Dropzone
        onDragOver={handleOnDragOver}
        onDragLeave={handleOnDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          hiddenInputRef.current.click();
        }}
        uploaded={uploaded}
      >
        {!loading ? (
          renderText()
        ) : (
          <div style={{ display: "flex" }}>
            <Loading />
          </div>
        )}
        <HiddenInput
          ref={hiddenInputRef}
          type="file"
          id={`file_upload_${labID}`}
          name="filename"
          onChange={(e) => {
            const size = e.target.files[0].size;
            if (e.target.files[0] && size < MAX_SIZE) {
              setFileName(e.target.files[0]);
              setFileAdded(true);
              setUploaded("");
            } else if (size >= MAX_SIZE) {
              setUploaded("big");
            }
          }}
        />
      </Dropzone>
      <StyledSubmit type="submit" onClick={handleSubmit} />
    </>
  );
}

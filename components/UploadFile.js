import { useState, useContext, useMemo } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";

const HiddenInput = styled.input`
    display: none;
  `;

  const StyledLabel = styled.label`
    padding: 40px;
    background: ${props => props.uploaded === 'succ' ? '#C1E1C1': props.uploaded === 'err'? '#E1C1C1': ''};
    opacity: 0.6;
    border: 2px dashed black;
    border-radius: 6px;
    display: block;
    cursor: pointer;
    color: black;
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
      background-color: #FFFBD6;
    }
  `;

  const Form = styled.form`
        margin-top: 15px;
  `

export default function UploadFile({ titleID, labID }) {
  const [file, setFileName] = useState();
  const [uploaded, setUploaded] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileAdded, setFileAdded] = useState(false);
  const { userID } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      url: "http://localhost:1337/api/hws",
      data: formData,
    })
      .then(({ data }) => {
        setUploaded("succ");
        setFileAdded(false);
        setLoading(false);
      })
      .catch((error) => {
        setUploaded("err");
        setFileAdded(false);
      });
  };

  const handleDrop = (event) => {
    event.stopPropogation();
    event.preventDefault();
    console.log("here");
    // Add a football image to the endzone, initiate a file upload,
    // steal the user's credit card
  };

  const renderText = () => {
    if (fileAdded) {
      return file.name;
    } else if (uploaded === "succ") {
      return `${file.name} succesfully uploaded`;
    }
    else if (uploaded === 'err') {
      return `file format not supported`
    }
    else {
      return `Drag 'n' drop some files here, or click to select files`;
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <StyledLabel
          for={`file_upload_${labID}`}
          uploaded={uploaded}
          handleDragEnter={(e) => {e.preventDefault; console.log('here')}}
        >
          {renderText()}
        </StyledLabel>
        <HiddenInput
          type="file"
          id={`file_upload_${labID}`}
          name="filename"
          onChange={(e) => {
            setFileName(e.target.files[0]);
            setFileAdded(true);
            setUploaded("");
          }}
        />
        <StyledSubmit type="submit" />
      </Form>
    </>
  );
}

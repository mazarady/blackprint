import React from "react";
import styled from "styled-components";
import { useRef, useEffect } from "react";

const StyledWrapper = styled.div`
  max-width: 720px;
  height: auto;
  border-radius: 6px;
  margin-bottom: 15px;
`;

const StyledTime = styled.small`
    font-family: "Karla";
    font-size: 15.5px;
    line-height: 1;
    cursor: pointer;
    transition: all 500ms ease;
    display: inline-block;
    &::after {
      content: '';
      width: 100%;
      height: 1px;
      display: block;
      background: black;
      transition: 300ms;
    }
`

export default function Recording(data) {
  let timeStampRefs;
  let tempRefs = [];
  for (let i = 0; i < data.data.length; i++) {
    tempRefs.push(React.createRef());
  }
  timeStampRefs = useRef(tempRefs);

  const onClickHandler = (evt, key) => {
    let time = evt.target.getAttribute("data-time");
    time = time.trim().split(":");
    let seconds;
    if (time.length === 3) {
      seconds = (+time[0]) * 60 * 60 + (+time[1]) * 60 + (+time[2]);
    }
    else {
      seconds = +time[0] * 60 + +time[1];
    }
    seconds.toString();
    const src = timeStampRefs.current[key].current.src.split("?")[0];
    const queryParam = `?t=${seconds}&autoplay=1`;
    timeStampRefs.current[key].current.src = src + queryParam;
  };

  const videos = data.data.map(({title, loom, timestamps}, key) => {
    return (
      <StyledWrapper key={key}>
        <div
          style={{
            marginTop: "15px",
            width: "100%",
            height: "100%",
            borderRadius: "inherit",
          }}
        >
          <h4 style={{margin: 0, paddingBottom: '5px', fontFamily: 'Karla', fontWeight: 'initial'}}>{title}</h4>
          <iframe
            style={{ width: "100%", height: "450px", borderRadius: "inherit" }}
            src={loom}
            frameBorder="true"
            ref={timeStampRefs.current[key]}
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            allowFullScreen
          ></iframe>
        </div>
        {timestamps.split(',').map((link, index) => {
          const linkDesc = link.trim().split(' ');
          return (
            <div key={index}>
              <StyledTime
                data-time={linkDesc[0]}
                onClick={(evt) => {
                  onClickHandler(evt, key);
                }}
              >
                {linkDesc[0]}
              </StyledTime>
              <small
                style={{
                  fontFamily: "Karla",
                  fontSize: "15.5px",
                }}
              >
                {" " + linkDesc[1]}
              </small>
            </div>
          );
        })}
      </StyledWrapper>
    );
  });


  return videos;
}

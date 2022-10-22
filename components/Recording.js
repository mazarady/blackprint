import React from "react";
import styled from "styled-components";
import { useRef, useEffect } from "react";

const StyledWrapper = styled.div`
  height: auto;
  border-radius: 6px;
  margin: 15px 0px;
  display: grid;
  @media (min-width: 990px) {
    grid-row-gap: 0px;
    grid-template-columns: minmax(375px, 720px) 210px;
    grid-column-gap: 40px;
  }
  h4 {
    grid-column: 1/-1;
  }
`;

const StyledTime = styled.small`
  font-family: "Karla";
  color: #433e40;
  font-size: 15.5px;
  line-height: 1;
  cursor: pointer;
  transition: all 500ms ease;
  display: inline-block;
  &::after {
    content: "";
    width: 100%;
    height: 1px;
    display: block;
    background: #433e40;
    transition: 300ms;
  }
`;

const StyledTimeStampWrapper = styled.div`
  display: grid;
  grid-row-gap: 5px;
  border-radius: inherit;
  background: #e3acb9;
  padding: 25px;
  max-width: 210px;
  margin-top: 15px;
  @media (min-width: 990px) {
    margin: 0px;
    max-width: initial;
  }
`;

const StyledChapter = styled(StyledTime)`
  cursor: initial;
  font-size: 16.5px;
  font-weight: bold;
  &::after {
    height: 0px;
  }
`;

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
      seconds = +time[0] * 60 * 60 + +time[1] * 60 + +time[2];
    } else {
      seconds = +time[0] * 60 + +time[1];
    }
    seconds.toString();
    const src = timeStampRefs.current[key].current.src.split("?")[0];
    const queryParam = `?t=${seconds}&autoplay=1`;
    timeStampRefs.current[key].current.src = src + queryParam;
  };

  const renderTimeStamps = (timestamps, key) => {
    return timestamps.split(",").map((link, index) => {
      const linkDesc = link.trim().split(" ");
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
              color: "#433E40",
            }}
          >
            {linkDesc.slice(1).map(desc => " " + desc)}
          </small>
        </div>
      );
    });
  };

  const videos = data.data.map(({ title, loom, timestamps }, key) => {
    return (
      <StyledWrapper key={key}>
        {title && (
          <h4
            style={{
              margin: 0,
              paddingBottom: "5px",
              fontFamily: "Karla",
              fontWeight: "initial",
            }}
          >
            {title}
          </h4>
        )}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "inherit",
            lineHeight: "0",
          }}
        >
          <iframe
            style={{
              width: "100%",
              height: "450px",
              borderRadius: "inherit",
            }}
            src={loom}
            frameBorder="true"
            ref={timeStampRefs.current[key]}
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            allowFullScreen
          ></iframe>
        </div>
        {timestamps && (
          <StyledTimeStampWrapper>
            <StyledChapter>Chapters</StyledChapter>
            {renderTimeStamps(timestamps, key)}
          </StyledTimeStampWrapper>
        )}
      </StyledWrapper>
    );
  });

  return videos;
}

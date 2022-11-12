import styled from "styled-components";
import { useState, useEffect } from "react";
import { GrayBar } from "./GrayBar";
import ReactPlayer from 'react-player'

const StyledSection = styled.div`
  height: 510px;
  border-radius: 6px;
  font-family: "Karla";
  background: #fdf9f4;
`;

const TabsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 630px;
`;

const TabsWrapperMaster = styled.div`
  background: #e4e0da;
  width: 100%;
`;

const StyledButton = styled.button`
  background: ${({ active }) => (active ? "#FDF9F4" : "#E4E0DA")};
  width: 100%;
  padding: 10px 24px;
  text-align: center;
  cursor: pointer;
  border: 0px;
  font-size: 15px;
  font-family: "Karla";
  color: ${({ active }) => (active ? "#4F4F4B" : "#9FA09A")};
  border-right: 1px solid rgb(95,96,90);
  &:hover {
    color: black;
  }
`;

const StyledContent = styled.div`
  display: ${({ active }) => (active ? "block" : "none")};
  padding: 0px 20px;
`;

export default function QuestionVideoWrapper({ children }) {
  const [active, setActive] = useState([true, false, false]);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    setVideo(<ReactPlayer url={'https://blkprnt-free-trial.s3.amazonaws.com/Lecture+-+Lab+3+Part+1.mp4'} controls={true} width="95%" height="470px" style={{margin: 'auto'}} />)
  }, [])
  const handleSwitch = (index) => {
    const nextActive = active.map((c, i) => {
      if (i === index) {
        return true;
      } else {
        return false;
      }
    });
    setActive(nextActive);
  };

  return (
    <div
      style={{
        boxShadow: "rgb(0 0 0 / 20%) 0px 8px 12px 0px",
        borderRadius: "5px",
      }}
    >
      <GrayBar>Program 1</GrayBar>
      <StyledSection>
        <TabsWrapperMaster>
          <TabsWrapper>
            <StyledButton active={active[0]} onClick={() => handleSwitch(0)}>
              Problem
            </StyledButton>
            <StyledButton active={active[1]} onClick={() => handleSwitch(1)}>
              Video
            </StyledButton>
            <StyledButton active={active[2]} onClick={() => handleSwitch(2)}>
              Walkthrough
            </StyledButton>
          </TabsWrapper>
        </TabsWrapperMaster>
        <StyledContent active={active[0]}>
          <h2>First</h2>
        </StyledContent>
        <StyledContent active={active[1]} style={{padding: '0px'}}>
          {video}
        </StyledContent>
        <StyledContent active={active[2]}>
          <h2>Third</h2>
        </StyledContent>
        {children}
      </StyledSection>
    </div>
  );
}

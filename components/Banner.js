import styled from "styled-components";
import Triangles from "./Triangles";

const StyledBanner = styled.div`
  min-height: 400px;
  padding-top: 80px;
  padding-bottom: 80px;
  background-color: ${({ bg }) => bg};
  text-align: center;
  position: relative;
`;

const StyledDiv = styled.div`
  max-width: 800px;
  margin: auto;
  text-align: right;
  padding: 3.5rem 0.8rem;
  z-index: 5;
  position: relative;

  @media (min-width: 1280px) {
    margin-right: 18%;
  }

  h1 {
    margin: 0;
    text-shadow: 4px 4px 0 #fff;
    font-family: "Karla", sans-serif;
    font-size: 2.5rem;
    margin-bottom: 25px;
    @media (min-width: 560px) {
      font-size: 4.209rem;
      text-align: right;
    }
  }

  ${({ level }) => {
    const levelTill =
      level === 0 ? "-n+1" : level == 1 ? "-n+2" : level == 2 ? "-n+3" : "";
    return `svg {
  rect:nth-child(${levelTill}) {
    fill: black
  }
}`;
  }}
`;

const StyledDesc = styled.div`
  line-height: 1.3;
  margin-bottom: 5px;
`;

export default function Banner({ title, desc, level, bg }) {
  const levelText =
    level == 0
      ? "Beginner"
      : level == 1
      ? "Intermediate"
      : level == 2
      ? "Advanced"
      : "";
  const renderIcons = () => {
    return (
      <svg
        className="cq cq-bz levelbars cq_bi level2"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <rect
          x="1"
          y="11"
          width="4"
          height="7"
          rx="2"
          fill=""
          stroke="currentColor"
        ></rect>
        <rect
          x="8"
          y="6"
          width="4"
          height="12"
          rx="2"
          fill=""
          stroke="currentColor"
        ></rect>
        <rect
          x="15"
          y="2"
          width="4"
          height="16"
          rx="2"
          fill=""
          stroke="currentColor"
        ></rect>
      </svg>
    );
  };

  return (
    <StyledBanner bg={bg}>
      <StyledDiv level={level}>
        <h1>{title}</h1>
        <StyledDesc dangerouslySetInnerHTML={{ __html: desc }} />
        <div>
          Course Level: {levelText} {renderIcons()}
        </div>
      </StyledDiv>
      {/* <div style={{ position: "absolute", top: "0" }}>
        <Triangles />
      </div> */}
    </StyledBanner>
  );
}

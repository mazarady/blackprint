import styled from "styled-components";
import { Small, H2, H5 } from "./Headers";

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 616px 616px;
  grid-column-gap: 80px;
  justify-content: center;
  padding: 110px 64px;
`;

const StyledSteps = styled.ul`
  margin: 0;
  padding: 0;
  li {
    padding: 0;
    margin: 0;
    list-style-type: none;
    padding-bottom: 78px;
    &:not(:first-of-type) {
      margin-top: 20px;
    }
    &.union {
      background: url("/union.svg") no-repeat left top;
      padding-left: 90px;
    }
    &.vector {
      background: url("/vector.svg") no-repeat left top;
      padding-left: 90px;
    }
    h5 {
      padding-bottom: 10px;
      font-weight: 600;
    }
  }
`;

const StyledLeft = styled.div`
  p {
    padding-bottom: 16px;
  }
`;

const How = () => {
  return (
    <StyledSection>
      <StyledLeft>
        <Small>How it works</Small>
        <H2>Headline with USP related to how your product or service works</H2>
      </StyledLeft>
      <StyledSteps>
        <li className="union">
          <H5>Short summary of step one</H5>
          <Small>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </Small>
        </li>
        <li className="union">
          <H5>Short summary of step one</H5>
          <Small>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </Small>
        </li>
        <li className="union">
          <H5>Short summary of step one</H5>
          <Small>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </Small>
        </li>
        <li className="vector">
          <H5>Short summary of step one</H5>
          <Small>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </Small>
        </li>
      </StyledSteps>
    </StyledSection>
  );
};

export default How;

import styled from "styled-components";
import { Small, H2, H6 } from "./Headers";

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 616px 616px;
  grid-column-gap: 80px;
  justify-content: center;
  padding: 110px 64px;
  h6 {
    margin-top: 24px;
  }
`;

const StyledImage = styled.div`
  background-image: url("/job.webp");
  background-position: 0px -93px;
  height: 640px;
`;

const StyledLeft = styled.div`
  p {
    padding-bottom: 16px;
  }
`;

const StyledH6 = styled(H6)`
  font-weight: 400;
  line-height: 1.5;
`;

const BenefitsThree = () => {
  return (
    <StyledSection>
      <StyledLeft>
        <Small style={{ fontWeight: "600" }}>Feature Three</Small>
        <H2>Describe benefit of feature three</H2>
        <StyledH6>
          Highlight Unique Selling Proposition (USP) with a short summary of the
          key feature and how it benefits customers.
        </StyledH6>
      </StyledLeft>
      <StyledImage></StyledImage>
    </StyledSection>
  );
};

export default BenefitsThree;

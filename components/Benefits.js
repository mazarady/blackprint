import styled from "styled-components";
import { H4, Small } from "./Headers";

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 405px 405px 405px;
  grid-column-gap: 48px;
  justify-content: center;
  padding: 110px 64px;
  h4 {
    margin: 24px 0px;
    font-weight: 600;

  }
`;

const Vector = styled.div`
  background: url("/vector.svg") no-repeat left top;
  height: 40px;
`

const Benefits = () => {
  return (
    <StyledSection>
      <div>
        <Vector />
        <H4>Highlight benefit one</H4>
        <Small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.</Small>
      </div>
      <div>
        <Vector />
        <H4>Highlight benefit one</H4>
        <Small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.</Small>
      </div>
      <div>
        <Vector />
        <H4>Highlight benefit one</H4>
        <Small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.</Small>
      </div>
    </StyledSection>
  );
};

export default Benefits;

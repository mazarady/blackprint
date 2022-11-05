import styled from "styled-components";
import { H4, H2, Small } from "./Headers";

const StyledSection = styled.section`
  text-align: center;
  padding: 112px 64px;
  .wrapper {
    margin-top: 80px;
    display: grid;
    grid-template-columns: 405px 405px 405px;
    grid-column-gap: 50px;
    justify-content: center;
  }
  h4 {
    margin: 24px 0px;
    font-weight: 600;
  }
`;

const Vector = styled.div`
  background: url("/vector.svg") no-repeat left top;
  height: 40px;
  background-position: center;
`;

const Benefits = () => {
  return (
    <StyledSection>
      <H2>Our Features</H2>
      <div className="wrapper">
        <div>
          <Vector />
          <H4>Highlight benefit one</H4>
          <Small>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla.
          </Small>
        </div>
        <div>
          <Vector />
          <H4>Highlight benefit one</H4>
          <Small>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla.
          </Small>
        </div>
        <div>
          <Vector />
          <H4>Highlight benefit one</H4>
          <Small>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla.
          </Small>
        </div>
      </div>
    </StyledSection>
  );
};

export default Benefits;

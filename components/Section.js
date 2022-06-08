import styled from "styled-components";
import { H2 } from "./Headers";

const StyledSection = styled.section`
  min-height: 300px;
  background: rgb(241, 237, 248);
  text-align: center;
  display: grid;
  align-items: center;



`

export default function Section() {
  return (
  <StyledSection>
    <H2>Our Courses</H2>
  </StyledSection>
)
}

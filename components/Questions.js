import styled from "styled-components";
import { Small, H2, H6 } from "./Headers";

const StyledSection = styled.section`
  padding: 110px 0px;
  padding-top: 260px;
  max-width: 768px;
  margin: auto;
  h2 {
    text-align: center;
  }
  p {
    line-height: 1.5;
  }
  .questions {
    margin-top: 80px;
    h6 {
      margin-top: 16px;
    }
    h6:not(:first-of-type) {
      margin-top: 48px;
    }
  }
`;

const Questions = () => {
  return (
    <StyledSection>
      <H2>Frequently asked questions</H2>
      <div className="questions">
        <H6>What is the time commitment?</H6>
        <Small>
          Our courses are split up in 4 parts, with each consisting of a
          duration of 3 months. Lectures are recorded and range from 1-2 hours
          and are accompanied by live lab sessions lasting about an hour. Your
          weekly commitment therefore, with the additon of homework, should be
          around 5-6 hours.
        </Small>
        <H6>Am I guarenteed a job after completing your course?</H6>
        <Small>
          Although, we cannot guarentee jobs after the completion of all 4
          courses, we do equip our students with the necesary tools to not only
          succesfully pass tehcnical coding interviews, but also thrive at the
          workplace.
        </Small>
        <H6>How many courses do you offer?</H6>
        <Small>
          Our 4 courses are to be completed consecutively and range from
          beginner programming to data structures.
        </Small>
        <H6>Is there 1:1 time with instructors?</H6>
        <Small>
          We offer live lab sessions with our instructors who can provide
          further context on subject material and assigned modules. In addition
          to labs, our instructors are available throughout the week for 1:1
          mentoring.
        </Small>
        <H6>Do I need tehcnical experience?</H6>
        <Small>
          We assume that all students have no experience in programming and
          structure our classes with that methodology.
        </Small>
        <H6>How many students per cohort?</H6>
        <Small>Our cohort range from 10-15 students at a time.</Small>
      </div>
    </StyledSection>
  );
};

export default Questions;

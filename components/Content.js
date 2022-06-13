import { H3, H5 } from "./Headers";
import styled from "styled-components";
import Labs from "./Labs";
import { Fragment } from "react";

const Section = styled.section`
  padding: 0px 20px;
  padding-top: 45px;
  @media (min-width: 576px) {
    padding: 45px 40px 0px;
  }
  @media (min-width: 1400px) {
    margin-left: 70px;
  }

  h5 {
    margin-top: 8px;
  }
`;

export default function Content({ labs }) {
  return (
    <Fragment>
      <Section>
        {labs.length > 0 ? <><H3>What&apos;s inside</H3>
        <H5>This course contains {labs.length} interactive modules.</H5></>: <H3>Coming Soon...</H3>}

      </Section>
      <Labs labs={labs} />
    </Fragment>
  );
}

import styled from "styled-components";
import { Small, H2, H5 } from "./Headers";
import Input from "./styles/Input";
import Button from "./Button";

const StyledSection = styled.section`
  display: grid;
  justify-content: center;
  padding: 110px 0px;
  text-align: center;
  max-width: 765px;
  margin: auto;
  input {
    max-width: 320px;
    width: 100%;
  }
  h2 {
    margin-bottom: 24px;
  }
  .form {
    margin-top: 40px;
  }
`;

const Cohort = () => {
  return (
    <StyledSection>
      <H2>Sign up for our next cohort</H2>
      <H5>
        We add new students on a rolling basis. Sign up below and we'll reach
        out when we've opened up registration
      </H5>
      <div
        style={{ display: "flex", justifyContent: "center", gap: "15px" }}
        className="form"
      >
        <Input
          type="email"
          id="email"
          name="email"
          color="white"
          required
          placeholder="Email"
          // value={Email}
          onChange={(e) => {}}
        />
        <Button text="Sign up" />
      </div>
    </StyledSection>
  );
};

export default Cohort;

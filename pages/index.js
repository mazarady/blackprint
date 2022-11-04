import styled from "styled-components";
import { H1, Sub, Small, H2, H5 } from "../components/Headers";
import Head from "next/head";

const HeroLayout = styled.section`
  background-color: white;
  display: grid;
  align-items: center;
  justify-content: center;
  background-image: url("/forest.webp");
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: 290%;
  @media (min-width: 376px) {
    background-size: 350%;
  }
  @media (min-width: 500px) {
    background-size: 300%;
  }
  @media (min-width: 576px) {
    background-size: 220%;
  }
  @media (min-width: 768px) {
    background-size: 175%;
  }
  @media (min-width: 920px) {
    background-size: 160%;
  }
  @media (min-width: 1200px) {
    background-size: 120%;
  }
  @media (min-width: 1400px) {
    background-size: 100%;
  }
`;

const TextWrapper = styled.div`
  margin-bottom: 8rem;
  text-align: right;
  padding: 0px 20px;
  display: grid;
  grid-row-gap: 7px;
  @media (min-width: 376px) {
    margin-bottom: 18rem;
  }
  @media (min-width: 576px) {
    margin-bottom: 17rem;
  }
`;

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
      background: url("/union.png") no-repeat left top;
      padding-left: 90px;
    }
    &.vector {
      background: url("/vector.png") no-repeat left top;
      padding-left: 90px;
    }
    h5 {
      padding-bottom: 10px;
    }
  }
`;

const StyledLeft = styled.div`
  p {
    padding-bottom: 16px;
  }
`;

const Home = () => {
  return (
    <div>
      <HeroLayout className="modal">
        <Head>
          <title>Home</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <TextWrapper>
          <H1>Introducing Blackprint</H1>
          <Sub>Learn to code from professionals.</Sub>
        </TextWrapper>
      </HeroLayout>
      <StyledSection>
        <StyledLeft>
          <Small>How it works</Small>
          <H2>
            Headline with USP related to how your product or service works
          </H2>
        </StyledLeft>
        <StyledSteps>
          <li className="union">
            <H5>Short summary of step one</H5>
            <Small>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </Small>
          </li>
          <li className="union">
            <H5>Short summary of step one</H5>
            <Small>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </Small>
          </li>
          <li className="union">
            <H5>Short summary of step one</H5>
            <Small>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </Small>
          </li>
          <li className="vector">
            <H5>Short summary of step one</H5>
            <Small>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </Small>
          </li>
        </StyledSteps>
      </StyledSection>
    </div>
  );
};

export default Home;

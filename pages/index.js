import styled from "styled-components";
import { H1, H5 } from "../components/Headers";
import Head from "next/head";
import How from "../components/How";
import Questions from "../components/Questions";
import Benefits from "../components/Benefits";
import Button from "../components/Button";
import Cohort from "../components/Cohort";
import Footer from "../components/Footer";
import BenefitsOne from "../components/BenefitsOne";
import BenefitsTwo from "../components/BenefitsTwo";
import BenefitsThree from "../components/BenefitsThree";
import AnchorText from "../components/AnchorText";

const HeroLayout = styled.div`
  padding: 112px 64px;
  display: grid;
`;

const TextWrapper = styled.div`
  text-align: center;
  h5 {
    margin-top: 8px;
  }
  button {
    margin-top: 30px;
    margin-bottom: 5px;
  }
`;

const ImageWrapper = styled.div`
  background: url("/board.gif") no-repeat center center;
  width: 100%;
  height: 640px;
  margin: auto;
  border-radius: 16px;
  margin-top: 20px;
`;

const Home = () => {
  return (
    <section>
      <HeroLayout className="modal">
        <Head>
          <title>Home</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <TextWrapper>
          <H1>Blackprint</H1>
          <H5>
            Learn to code, in as little as 8 months, from industry
            professionals.
          </H5>
          <AnchorText text="Learn More" id="learn-more" />
        </TextWrapper>
        <ImageWrapper />
      </HeroLayout>
      <How />
      <Benefits />
      <BenefitsOne />
      <BenefitsTwo />
      <BenefitsThree />
      <Cohort />
      <Questions />
      <Footer />
    </section>
  );
};

export default Home;

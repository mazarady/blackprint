import styled from "styled-components";
import { H1, Sub } from "../components/Headers";
import Head from "next/head";

const HomeLayout = styled.section`
  min-height: 100vh;
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

const Home = () => {
  return (
    <HomeLayout className="modal">
      <Head>
        <title>Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <TextWrapper>
        <H1>Introducing Blackprint</H1>
        <Sub>Learn to code from professionals.</Sub>
      </TextWrapper>
    </HomeLayout>
  );
};

export default Home;

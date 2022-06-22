import styled from "styled-components";
import { H2 } from "./Headers";
import NavBar from "./styles/NavBar";
import Link from "next/link";
import LogoH3 from "./styles/LogoH3";

const Background = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: grid;
  align-content: center;
  background: #121418;
  h3 {
    color: #fdfdfd;
    text-shadow: initial;
  }
`;

const Wrapper = styled.div`
  max-width: 675px;
  margin: auto;
  width: 100%;
  padding: 15px;

  h2 {
    color: #fdfdfd;
    text-align: center;
    margin-bottom: 30px;
    @media (min-width: 400px) {
      margin-bottom: 50px;

    }
  }
`;

export default function Modal({ children, header }) {
  return (
    <Background>
      <NavBar>
        <Link href="/" passHref>
          <LogoH3>blkprnt</LogoH3>
        </Link>
      </NavBar>
      <Wrapper>
        <H2>{header}</H2>
        {children}
      </Wrapper>
    </Background>
  );
}

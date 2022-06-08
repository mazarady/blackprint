import styled from "styled-components";
import Link from "next/link";
import { useContext, Fragment } from "react";
import { NavModalContext } from "./context/NavModalContext";
import { parseCookies } from 'nookies'

const NavBar = styled.nav`
  position: absolute;
  top: 0;
  z-index: 5;
  display: grid;
  grid-template-columns: max-content max-content;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 30px 40px;
`;

const SecondNav = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  grid-column-gap: 30px;
`

const LogoH3 = styled.h3`
  font-family: Arial;
  font-size: 23px;
  letter-spacing: 2px;
  color: #303030;
  margin: 0;
  line-height: 25px;
  cursor: pointer;
  text-shadow: 3px 3px 0 #fff;
`;

export default function Nav() {
  const jwt = parseCookies().jwt
  return (
    <NavBar>
      <Link href="/">
        <LogoH3>blkprnt</LogoH3>
      </Link>
      <SecondNav>
        <Link href="/courses">
          <LogoH3>courses</LogoH3>
        </Link>
        {!jwt ? <><Link href="/login">
          <LogoH3>login</LogoH3>
        </Link>
        <Link href="/register">
          <LogoH3>sign up</LogoH3>
        </Link></>: <Link href="/logout"><LogoH3>logout</LogoH3></Link>}
      </SecondNav>
    </NavBar>
  );
}




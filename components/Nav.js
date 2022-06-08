import styled from "styled-components";
import Link from "next/link";
import { useContext } from "react";
import { NavModalContext } from "./context/NavModalContext";
import { parseCookies } from 'nookies'

const NavBar = styled.nav`
  position: absolute;
  top: 0;
  z-index: 5;
`;

const LogoH3 = styled.h3`
  font-family: Arial;
  font-size: 23px;
  letter-spacing: 2px;
  color: #303030;
  margin: 0;
  line-height: 25px;
  cursor: pointer;
  text-shadow: 3px 3px 0 #fff;
  margin-left: 30px;
  margin-top: 30px;
  @media (min-width: 1040px) {
    margin-left: 90px;
  }
`;

export default function Nav() {
  const jwt = parseCookies().jwt
  return (
    <NavBar>
      <Link href="/">
        <LogoH3>blkprnt</LogoH3>
      </Link>
      <Link href="/classes">
        <LogoH3>classes</LogoH3>
      </Link>
      {!jwt ? <><Link href="/login">
        <LogoH3>login</LogoH3>
      </Link>
      <Link href="/register">
        <LogoH3>sign up</LogoH3>
      </Link></>: <Link href="/logout"><LogoH3>logout</LogoH3></Link>}
    </NavBar>
  );
}




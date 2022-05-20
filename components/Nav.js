import styled from "styled-components";
import Link from "next/link";

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

export default function Nav({ content }) {
  return (
    <NavBar>
      <Link href="/">
        <LogoH3>blkprnt</LogoH3>
      </Link>
    </NavBar>
  );
}

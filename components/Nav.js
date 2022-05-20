import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const NavBar = styled.nav`
  position: absolute;
  top: 0;
  z-index: 5;
`;

const TestH3 = styled.h3`
  font-family: Arial;
  font-size: 23px;
  letter-spacing: 2px;
  color: #303030;
  margin: 0;
  line-height: 25px;
  cursor: pointer;
  text-shadow: 3px 3px 0 #fff;
  margin-left: 110px;
  margin-top: 30px;
`;

export default function Nav({ content }) {
  return (
    <NavBar>
      <Link href="/">
        <TestH3>blkprnt</TestH3>
      </Link>
    </NavBar>
  );
}

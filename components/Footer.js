import styled from "styled-components";
import LogoH3 from "./styles/LogoH3";
import { Small } from "./Headers";
import Link from "next/link";

const StyledFooter = styled.footer`
  padding: 80px 64px;
  .first {
    display: flex;
    justify-content: space-between;
  }
  .copyright-text {
    margin-top: 32px;
  }
  .bar {
    margin-top: 50px;
    width: 100%;
    height: 2px;
    background: #3f3343;
  }
`;

export default function Footer() {
  const date = new Date();

  return (
    <StyledFooter>
      <div className="first">
        <Link href="/" passHref>
          <LogoH3 className="logo">blkprnt</LogoH3>
        </Link>
        <div className="links" style={{ display: "flex", gap: "10px" }}>
          <Link href="/courses" passHref>
            <Small style={{ cursor: "pointer" }}>courses</Small>
          </Link>
          <Link href="/login" passHref>
            <Small style={{ cursor: "pointer" }}>login/register</Small>
          </Link>
        </div>
      </div>
      <div className="bar"></div>
      <Small className="copyright-text" style={{ textAlign: "center" }}>
        Copyright &copy; {date.getFullYear()} All Rights Reserved by
        <a href="#"> Blackprint</a>.
      </Small>
    </StyledFooter>
  );
}

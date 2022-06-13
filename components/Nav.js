import styled from "styled-components";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useState } from "react";
import * as ReactDOM from "react-dom";
import NavBar from "./styles/NavBar";
import LogoH3 from "./styles/LogoH3";

const SecondNav = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-column-gap: 20px;
  h3 {
    font-weight: 400;
    &:after {
      content: "";
      width: 100%;
      height: 2px;
      background-color: black;
      display: block;
      top: 2px;
      position: relative;
      opacity: 0;
      transition: opacity 200ms ease-in-out;
    }
    &:hover {
      &:after {
        opacity: 1;
      }
    }
  }
  transition: all 200ms ease-in-out;
  display: none;
  @media (min-width: 1040px) {
    display: grid;
  }
`;


const HamburgerNav = styled.div`
  grid-template-columns: max-content;
  grid-template-rows: max-content max-content;
  grid-row-gap: 15px;
  display: grid;
  position: absolute;
  text-align: right;
  right: 0;
  justify-content: flex-end;
  top: 0;
  min-height: 100vh;
  background: #303030;

  padding: 4.8rem 22px;
  padding-left: 0px;
  z-index: 5;
  min-width: 576px;
  @media (min-width: 576px) {
    min-width: 375px;
  }
  h3 {
    color: white;
    text-shadow: initial;
    font-weight: 400;
    letter-spacing: 3px;
  }
`;

const MobileNav = styled.div`
  position: relative;
  @media (min-width: 1040px) {
    display: none;
  }
`;
const HamburgerIcon = styled.button`
  width: 26px;
  height: 22px;
  position: relative;
  margin: 50px auto;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  div {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: #303030;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
  }
  div:nth-child(1) {
    top: 0px;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
  }

  div:nth-child(2) {
    top: 7px;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
  }

  div:nth-child(3) {
    top: 14px;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
  }

  ${({ navOpen }) =>
    navOpen &&
    `
      div {
    background: #fff;

      }
      div:nth-child(1) {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
        top: -3px;
        left: 2px;
      }

      div:nth-child(2) {
        width: 0%;
        opacity: 0;
      }

      div:nth-child(3) {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        top: 15.5px;
        left: 1px;
      }
    `};

  background-color: transparent;
  margin: 0;
  padding: 0;
  border: 0px;
  cursor: pointer;
`;

export default function Nav() {
  const { user } = useContext(AuthContext);
  let [navOpen, setNavOpen] = useState(false);

  return (
    <NavBar>
      <Link href="/" passHref>
        <LogoH3 className="logo" navOpen={navOpen}>
          blkprnt
        </LogoH3>
      </Link>
      <SecondNav>
        <Link href="/courses" passHref>
          <LogoH3>courses</LogoH3>
        </Link>
        {!user ? (
          <>
            <Link href="/login" passHref>
              <LogoH3>login/register</LogoH3>
            </Link>
          </>
        ) : (
          <Link href="/logout" passHref>
            <LogoH3>{user.username} (logout)</LogoH3>
          </Link>
        )}
      </SecondNav>
      <MobileNav>
        <HamburgerIcon
          onClick={() => {
            setNavOpen(!navOpen);
          }}
          navOpen={navOpen}
        >
          <div></div>
          <div></div>
          <div></div>
        </HamburgerIcon>
        {navOpen &&
          ReactDOM.createPortal(
            <HamburgerNav>
              <Link href="/courses" passHref>
                <LogoH3
                  onClick={() => {
                    setNavOpen(!navOpen);
                  }}
                >
                  courses
                </LogoH3>
              </Link>
              {!user ? (
                <>
                  <Link href="/login" passHref>
                    <LogoH3
                      onClick={() => {
                        setNavOpen(!navOpen);
                      }}
                    >
                      login/register
                    </LogoH3>
                  </Link>
                </>
              ) : (
                <Link href="/logout" passHref>
                  <LogoH3
                    onClick={() => {
                      setNavOpen(!navOpen);
                    }}
                  >
                    {user.username} (logout)
                  </LogoH3>
                </Link>
              )}
            </HamburgerNav>,
            document.body
          )}
      </MobileNav>
    </NavBar>
  );
}

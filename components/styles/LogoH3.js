import styled from "styled-components";

const LogoH3 = styled.h3`
  font-family: Arial;
  font-size: 23px;
  letter-spacing: 2px;
  color: #303030;
  margin: 0;
  line-height: 25px;
  cursor: pointer;
  text-shadow: 3px 3px 0 #fff;

  &.logo {
    ${({ navOpen }) =>
      navOpen &&
      `
    color: white;
    text-shadow: initial;
    @media (min-width: 576px) {
      color: #303030;
      text-shadow: 3px 3px 0 #fff;
    }`}
  }
`;

export default LogoH3

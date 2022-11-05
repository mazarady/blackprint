import styled from "styled-components";

const NavBar = styled.nav`
  position: absolute;
  top: 0;
  z-index: 6;
  display: grid;
  grid-template-columns: max-content max-content;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 30px 20px;

  @media (min-width: 920px) {
    padding: 30px 64px;
  }
`;

export default NavBar;

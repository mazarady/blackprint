import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-column-gap: 40px;
  grid-row-gap: 40px;
  margin: auto;
  margin-top: 4rem;
  padding: 0px 3rem;

  @media(min-width: 1020px) {
    margin-top: 9rem;
    padding: 0px 6rem;
  }
`;

export default function Card({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

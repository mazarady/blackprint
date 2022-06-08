import styled from "styled-components";

const StyledH3 = styled.h3`
  font-size: 32px;
  font-family: "Karla", sans-serif;
  line-height: 40px;
  color: rgb(43, 40, 57);
  margin: 0;
`;

const StyledH5 = styled.h5`
  font-size: 20px;
  font-weight: 400;
  font-family: "Karla", sans-serif;
  line-height: 28px;
  color: rgb(43, 40, 57);
  margin: 0;
`;

const StyledH6 = styled.h6`
  font-size: 18px;
  font-family: "Karla", sans-serif;
  line-height: 45px;
  font-weight: 600;
  margin: 0;
`;

const StyledH2 = styled.h2`
  font-size: 48px;
  font-family: "Karla", sans-serif;
  line-height: 52px;
  font-weight: 700;
  margin: 0;
`;

const StyledH4 = styled.h4`
  font-size: 24px;
  font-family: "Karla", sans-serif;
  line-height: 38px;
  font-weight: 400;
  line-height: 1.3;
`;

export function H2({ children }) {
  return <StyledH2>{children}</StyledH2>;
}

export function H3({ children }) {
  return <StyledH3>{children}</StyledH3>;
}

export function H4({ children }) {
  return <StyledH4>{children}</StyledH4>;
}

export function H5({ children }) {
  return <StyledH5>{children}</StyledH5>;
}

export function H6({ children, ...rest }) {
  return <StyledH6 {...rest}>{children}</StyledH6>;
}

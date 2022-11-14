import styled from "styled-components";
export const GrayBar = styled.div`
  width: 100%;
  background: rgb(95, 96, 90);
  height: 30px;
  border-radius: 5px 5px 0px 0px;
  color: #ededec;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  letter-spacing: 0.5px;
  font-size: 14px;
  .terminal {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    cursor: pointer;
    width: 14px;
    margin-left: 10px;
  }
`;

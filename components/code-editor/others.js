import styled, { css } from "styled-components";

export const StyledRight = styled.div`
  width: 100%;
  flex: 1;
`;

export const EditorCodeFooter = styled.div`
  width: 100%;
  background: #1e1e1e;
  border-top: 0.5px solid white;
  display: flex;
  justify-content: end;
  gap: 15px;
  padding: 10px 16px;
  border-radius: 0px 0px 5px 5px;
`;

export const SectionWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  column-gap: 30px;
  align-items: start;
  justify-content: center;
  padding: 15px;
  textarea {
    resize: none;
  }
`;

export const StyleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  width: auto;
  padding: 4px 10px;
  font-size: 18px;
  line-height: 1;
  user-select: none;
  transition: all 0.2s ease 0s;
  border-radius: 2px;
  cursor: ${({ processing }) => (processing ? "initial" : "pointer")};
  color: rgb(255, 255, 255);
  background-color: ${({ processing }) =>
    processing ? "gray" : "rgb(0, 196, 154)"};
  border: 0px;
  height: 30px;
  font-family: monospace;

  .play,
  .share,
  .test {
    background-image: url("/play.png");
    width: 18px;
    margin-right: 5px;
    height: 18px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .share {
    background-image: url("/share.png");
    width: 16px;
  }

  .test {
    background-image: url("/test.png");
    width: 20px;
    margin-right: 2px;
  }

  ${({ processing }) => {
    if (!processing) {
      return css`
        &:hover {
          background-color: #97e7d5;
          color: #159b77;

          .play {
            background-image: url("/play-hover.png");
          }

          .share {
            background-image: url("/share-hover.png");
          }

          .test {
            background-image: url("/test-hover.png");
          }
        }
      `;
    }
  }}
`;

export const StyledCollapse = styled.span`
  background: url("./collapse.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: 15px;
  height: 15px;
  display: inline-block;
  transform: rotate(180deg);
  cursor: pointer;
`;

export const TestResultsWrapper = styled.div`
  input[type="checkbox"] {
    display: none;
  }
  .lbl-toggle {
    cursor: pointer;
    display: block;
  }

  .collapsible {
    max-height: 0px;
    overflow: hidden;
    transition: max-height 0.25s ease-in-out;
  }

  .toggle:checked + .lbl-toggle + .collapsible {
    max-height: 100px;
  }
`;

export const StyledNav = styled.div`
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

export const StyledNavButton = styled.button`
  border: 0px;
  color: gray;
  font-family: monospace;
  cursor: pointer;
  font-size: 16px;
  letter-spacing: 0.5px;
  background: transparent;
  transition: color 200ms ease-in-out;
  &:hover {
    color: rgb(255, 183, 107);
  }
`;

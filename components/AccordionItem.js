import styled, { css } from "styled-components";
import { H6, H2, H4 } from "./Headers";
import InstructWell from "./InstructionWell";

const ItemDiv = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: 80%;
  }
  transition: all 200ms ease-out;

  ${({ on }) => {
    if (on == "show-description") {
      return css`
        background-color: #cfdbfe;
        margin: 0px;
        width: 100% !important;
        &:nth-child(odd) {
          background-color: #f3fecf;
        }
      `;
    }
  }}

  .faq__question {
    max-width: 350px;
    width: 100%;
  }

  .faq__question-button {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, max-content);
    grid-column-gap: 15px;
    border: none;
    background-color: transparent;
    padding: 0px;
    cursor: pointer;
    border-bottom: 2px solid #ededed;
    margin-bottom: 8px;
  }

  .faq__desc {
    font-weight: 400;
    margin-top: 0;
    margin-bottom: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 200ms ease-in-out;
    max-width: 1200px;

  }
  .faq__desc.show-description {
    max-height: 2000px;
    p {
      margin: 0;
    }
    padding-bottom: 25px;
  }
`;

const StyledQA = styled.div`
  padding: 0px 20px;
  @media (min-width: 576px) {
    padding: 0px 40px;

  }
  @media (min-width: 1400px) {
    margin-left: 70px;
  }

  ${({ on }) => {
    if (on == "show-description") {
      return css`
        &:first-of-type {
          padding-top: 15px;
          transition: all 200ms ease-out;
        }
      `;
    }
  }}
`;

const Time = styled.small`
  font-weight: 400;
  font-size: 14px;
  ${({on}) => {
    if (!on) {
      return css`margin-left: -5px;`
    }

  }}
`

const AccordionItem = ({
  showDescription,
  ariaExpanded,
  item,
  index,
  time,
  onClick,
}) => (
  <ItemDiv className="faq__question" key={item.id} on={showDescription} >
    <StyledQA on={showDescription}>
      <H6
        aria-expanded={ariaExpanded}
        aria-controls={`faq${index + 1}_desc`}
        data-qa="faq__question-button"
        className={`faq__question-button`}
        onClick={onClick}
      >
        <span>Module {index}</span> {!showDescription ? item.title : ""}
        <Time on={showDescription}>- {item.time} hours</Time>
      </H6>
    </StyledQA>
    <StyledQA on={showDescription}>
      <div
        id={`faq${index + 1}_desc`}
        data-qa="faq__desc"
        className={`faq__desc ${showDescription}`}
      >
        <H2>{item.title}</H2>
        <H4>{item.desc}</H4>
        <InstructWell instructions={item.instructions} />
      </div>
    </StyledQA>
  </ItemDiv>
);

export default AccordionItem;
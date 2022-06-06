import styled from "styled-components";
import { Fragment } from "react";
import { H6 } from "./Headers";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ReactDom from 'react-dom'

const Well = styled.div`
  height: auto;
  width: auto;
  background-color: white;
  margin: 15px 0px 0px;
  padding: 25px;
  border-radius: 15px;
`;

const StyledH6 = styled(H6)`
line-height: 20px;
padding-bottom: 15px;
`

const Title = styled.div`
`;

const Item = styled.div`
a {
  color: #A55858
}
.listItem {
  line-height: 1.3;
  ul {
    display: grid;
    grid-template-rows: 1fr;
    grid-row-gap: 5px;
  }
}
`;

export default function InstructWell({ instructions }) {
  return (
    <div>
      {instructions.map((item, index) => {
        return (
          <Well key={index}>
            <Title>
              <StyledH6>{item.title}</StyledH6>
            </Title>
               <Item key={index}>
                <div className="listItem">
                  <ReactMarkdown children={item.steps} remarkPlugins={[remarkGfm]} />
               </div>
               </Item>
          </Well>
        );
      })}
    </div>
  );
}

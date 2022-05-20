import styled from "styled-components";
import { Fragment } from "react";
import { H6 } from "./Headers";

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
display: flex;

&::before {
  content: "-";
  padding-right: 10px;
}
pre {
  margin: 0px;
  font-size: 14px;
  color: #A55858;
  display: inline-block;

}
img {
  max-width: 100%;
  width: 320px;
  border-radius: 16px;
}
a {
  color: #A55858
}
.listItem {
  padding-bottom: 5px;
  line-height: 1.5
}
`;

export default function InstructWell({ instructions }) {
  return (
    <div>
      {instructions.map((item) => {
        return (
          <Well>
            <Title>
              <StyledH6>{item.title}</StyledH6>
            </Title>
            {item.list.map(listItem => {
              return <Item><div className="listItem" dangerouslySetInnerHTML={{__html: listItem}}></div></Item>
            })}
          </Well>
        );
      })}
    </div>
  );
}

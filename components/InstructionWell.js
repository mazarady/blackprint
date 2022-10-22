import styled from "styled-components";
import { H6 } from "./Headers";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import UploadFile from "./UploadFile";
import Recording from "./Recording";

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
`;

const Title = styled.div``;

const Item = styled.div`
  a {
    color: #ff5349;
  }
  .listItem {
    line-height: 1.4;
    h5 {
      font-weight: 400;
      margin: 0;
      padding-top: 2px;
      line-height: 1.3;
    }
    ul {
      display: grid;
      grid-template-rows: 1fr;
      grid-row-gap: 10px;
      padding-inline-start: 20px;
      @media (min-width: 500px) {
        padding-inline-start: 40px;
      }
    }
    img {
      max-width: 100%;
    }
  }
  code {
    color: #ff5349;
  }
`;

export default function InstructWell({ instructions, titleID, labID, jwt }) {
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
                {item.videos && <Recording data={item.videos} />}
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {item.steps}
                </ReactMarkdown>
                {item.title.toLowerCase() === "submission" && (
                  <UploadFile titleID={titleID} labID={labID} jwt={jwt} />
                )}
              </div>
            </Item>
          </Well>
        );
      })}
    </div>
  );
}

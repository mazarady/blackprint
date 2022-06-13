import styled from "styled-components";
import { H4 } from "./Headers";
import Link from "next/link";
import { useRouter } from "next/router";

const StyledCard = styled.div`
  border: 1px solid #2b2839;
  position: relative;
  display: grid;
  cursor: pointer;
  border-radius: 16px;
  .title {
    color: rgb(65, 91, 124);
    border-radius: 16px;

    text-align: center;
    background-color: ${(props) => props.bg};
    padding: 35px 10px;
  }
  .content {
    padding: 20px;
    font-family: "Karla";
  }
`;

export default function Card({ title, time, difficulty, slug, bg }) {
  const router = useRouter();
  return (
    <Link href={`${router.pathname}/python/${slug}`}>
      <StyledCard bg={bg}>
        <div className="title">
          <H4>{title}</H4>
        </div>
        <div className="content">
          Course level:{" "}
          <strong>
            {difficulty === 0
              ? "beginner"
              : difficulty === 1
              ? "intermeidate"
              : "advanced"}
          </strong>
        </div>
      </StyledCard>
    </Link>
  );
}

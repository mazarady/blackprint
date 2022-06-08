import { Triangle } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  margin: auto;
`;
export default function Loading() {
  return (
    <LoadingWrapper>
      <Triangle ariaLabel="loading-indicator" color="rgba(76, 145, 149)" />
    </LoadingWrapper>
  );
}

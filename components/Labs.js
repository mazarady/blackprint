import { H3, H5 } from "./Headers";
import styled from "styled-components";
import Accordion from "./Accordion";

export default function Labs({ labs, titleID }) {
  return <Accordion labs={labs} titleID={titleID} />;
}

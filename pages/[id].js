import { getAllClassIds, getClassData } from "../lib/classes";
import Banner from "../components/Banner";
import Content from "../components/Content";
import Nav from "../components/Nav";

import { Fragment } from "react";

export default function Classes({ classData }) {
  const { data } = classData;
  return (
    <Fragment>
      <Nav />
      <Banner
        title={data[0].title}
        desc={data[0].desc}
        level={data[0].level}
        bg={data[0].bg}
      />
      <Content content={data[0].content} labs={data[0].labs} />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const paths = getAllClassIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const classData = getClassData(params.id);
  return {
    props: {
      classData,
    },
  };
}

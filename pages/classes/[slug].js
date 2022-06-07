import { getAllClassIds, getClassData } from "../../lib/classes";
import Banner from "../../components/Banner";
import Content from "../../components/Content";
import Nav from "../../components/Nav";

import { Fragment } from "react";

export default function Classes({ classData, labData }) {
  const {
    0: { attributes: classAttrs },
  } = classData;
  return (
    <Fragment>
      <Nav />
      <Banner
        title={classAttrs.title}
        desc={classAttrs.desc}
        level={classAttrs.level}
        bg={classAttrs.bg}
      />
      <Content labs={labData} />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const paths = await getAllClassIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getClassData(params.slug);
  const {
    data: { classData, labData },
  } = data;

  return {
    props: {
      classData,
      labData,
    },
    revalidate: 10, // In seconds
  };
}

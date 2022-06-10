import { getAllClassIds, getClassData } from "../../../lib/classes";
import Banner from "../../../components/Banner";
import Content from "../../../components/Content";
import { Fragment } from "react";
import nookies from "nookies";
import Head from "next/head";

export default function Classes({ classData, labData }) {
  const {
    0: { attributes: classAttrs },
  } = classData;
  return (
    <Fragment>
      <Head>
        <title>{classAttrs.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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

// export async function getStaticPaths() {
//   const paths = await getAllClassIds();
//   return {
//     paths,
//     fallback: false,
//   };
// }

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const { params } = ctx;
  const data = await getClassData(params.slug, cookies.jwt);
  const {
    data: { classData, labData },
  } = data;

  if (labData) {
    return {
      props: {
        classData,
        labData,
      },
    };
  } else {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}

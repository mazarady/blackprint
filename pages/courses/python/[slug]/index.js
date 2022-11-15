import { getClassData } from "../../../../lib/courseHelpers";
import Banner from "../../../../components/Banner";
import Content from "../../../../components/Content";
import { Fragment } from "react";
import nookies from "nookies";
import Head from "next/head";

export default function Classes({ classData, labData, cookies }) {
  const {
    0: { attributes: classAttrs, id },
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
      <Content labs={labData} titleID={id} jwt={cookies.jwt} />
    </Fragment>
  );
}

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const { params } = ctx;
  const data = await getClassData(params.slug, cookies.jwt);
  const {
    data: { classData, labData },
  } = data;

  if (labData) {
    labData.sort((a, b) =>
      a.attributes.number > b.attributes.number ? 1 : -1
    );
    return {
      props: {
        classData,
        labData,
        cookies,
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

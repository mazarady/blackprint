import { getAllClassIds, getClassData } from "../../lib/classes";
import Banner from "../../components/Banner";
import Content from "../../components/Content";
import Nav from "../../components/Nav";
import LoginForm from "../../components/LoginForm";
import Modal from "../../components/Modal";
import { NavModalContext } from "../../components/context/NavModalContext";
import { Fragment, useState } from "react";

export default function Classes({ classData, labData }) {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    0: { attributes: classAttrs },
  } = classData;
  return (
    <Fragment>
      <NavModalContext.Provider value={{ modalOpen, setModalOpen }}>
        <Nav />
        <Modal header="Login">
          <LoginForm />
        </Modal>
      </NavModalContext.Provider>
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

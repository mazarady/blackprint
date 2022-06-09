import styled from "styled-components";
import Section from "../components/Section";
import Card from "../components/Card";
import CardWrapper from "../components/CardWrapper";
import Head from "next/head";

export default function Courses({ data }) {
  return (
    <div>
      <Head>
        <title>Courses</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Section />
      <CardWrapper>
        {data.map((course, idx) => {
          return (
            <Card
              key={idx}
              difficulty={course.attributes.level}
              title={course.attributes.title}
              slug={course.attributes.slug}
              bg={course.attributes.bg}
            />
          );
        })}
      </CardWrapper>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`http://localhost:1337/api/classes`);
  const json = await res.json();
  const data = json.data;
  return {
    props: {
      data,
    },
    revalidate: 10, // In seconds
  };
}

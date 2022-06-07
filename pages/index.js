import Nav from "../components/Nav";
import { useEffect } from "react";

// export default function Home() {
//   return <Nav/>;
// }
import { useUser } from "../lib/useUser";

const Home = (data) => {
  console.log(data.data.loginRes);
  return (
    <div>
      <h1>Your Profile</h1>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </div>
  );
};

export async function getStaticProps() {
  const loginInfo = {
    identifier: "mazarady",
    password: "Cool_1971",
  };
  const data = await useUser({ loginInfo });

  return {
    props: {
      data,
    },
    revalidate: 10, // In seconds
  };
}

export default Home;

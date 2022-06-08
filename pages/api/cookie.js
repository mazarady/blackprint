import { parseCookies } from "nookies";

export default async (req, res) => {
  const jwt = parseCookies({ req }).jwt;
  // validate user
  // send back username
  console.log(jwt);
  res.send({ title: "hi" });
};

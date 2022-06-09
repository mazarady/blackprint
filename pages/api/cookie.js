import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";

export default async (req, res) => {
  try {
    const jwt = parseCookies({ req }).jwt;
    const { id } = jwt_decode(jwt);
    const fetchUser = await fetch(`http://localhost:1337/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const reqJson = await fetchUser.json();
    const { username } = reqJson;
    res.status(200).send({ username }).end();
  } catch (err) {
    res.status(400);
  }
  res.status(400).end();
};

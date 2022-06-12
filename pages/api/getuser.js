import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";

export default async (req, res) => {
  try {
    const jwt = parseCookies({ req }).jwt;
    const { id } = jwt_decode(jwt);
    let fetchUser = await fetch(
      `${process.env.STRAPI_PUBLIC_BASE_URL}/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    let reqJson = await fetchUser.json();
    let { username } = reqJson;
    res.status(200).send({ username });
  } catch (err) {
    res.status(404).send();
  }
  res.status(404).send();
};

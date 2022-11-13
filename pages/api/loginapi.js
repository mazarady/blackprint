import { setCookie } from "nookies";
import { useUser } from "../../lib/useUser";

export default async (req, res) => {
  const { password, identifier } = JSON.parse(req.body);
  const reqInfo = {
    identifier,
    password,
  };
  try {
    const postRes = await useUser({ reqInfo });

    if (!postRes?.jwt) {
      res.status(400).send();
      return;
    }

    const {
      user: { id, username },
    } = postRes;

    setCookie({ res }, "jwt", postRes.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    res.status(200).send({ id, username });
  } catch (e) {
    res.status(400).send();
  }
};

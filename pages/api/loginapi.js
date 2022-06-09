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
    const loginRes = await postRes.json();

    setCookie({ res }, "jwt", loginRes.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    res.status(postRes.status).end();
  } catch (e) {
    res.status(400);
  }
};

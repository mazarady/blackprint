import { setCookie } from "nookies";
import { useUser } from "../../lib/useUser";

export default async (req, res) => {
  const { username, email, password } = JSON.parse(req.body);
  const reqInfo = {
    username,
    email,
    password,
  };
  try {
    const postRes = await useUser({ reqInfo, type: "register" });
    const registerRes = await postRes.json();

    setCookie({ res }, "jwt", registerRes.jwt, {
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

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
    const registerRes = await useUser({ reqInfo, type: "register" });

    if (!registerRes?.jwt) {
      console.log(registerRes);
      const {
        error: { message },
      } = registerRes;
      if (message.includes("Email")) {
        res.status(400).send({ error: "email is already taken" });
      } else {
        res.status(400).send({ error: "username is already taken" });
      }
      return;
    }

    const {
      user: { id, username },
    } = registerRes;

    setCookie({ res }, "jwt", registerRes.jwt, {
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

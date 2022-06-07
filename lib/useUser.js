import Router from "next/router";

export async function useUser({ reqInfo, type="" } = {}) {
  console.log(reqInfo);
  const login = await fetch(
    `https://frozen-depths-76264.herokuapp.com/api/auth/local/${type}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqInfo),
    }
  );
  return login;
}

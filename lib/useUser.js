import Router from "next/router";

export async function useUser({ reqInfo, type="" } = {}) {
  const login = await fetch(
    `http://localhost:1337/api/auth/local/${type}`,
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

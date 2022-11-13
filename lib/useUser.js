export async function useUser({ reqInfo, type = "" } = {}) {
  const login = await fetch(
    `${process.env.STRAPI_PUBLIC_BASE_URL}/auth/local/${type}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqInfo),
    }
  );
  const loginRes = await login.json();
  return loginRes;
}

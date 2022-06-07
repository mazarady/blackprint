import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export async function useUser({ loginInfo } = {}) {
  console.log("here");
  const login = await fetch(
    "https://frozen-depths-76264.herokuapp.com/api/auth/local",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    }
  );
  const loginRes = await login.json();
  return { loginRes };
}

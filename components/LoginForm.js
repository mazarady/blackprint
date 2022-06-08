import styled from "styled-components";
import FormButton from "./FormButton";
import { useState } from "react";
import { useUser } from "../lib/useUser";
import { useRouter } from 'next/router'
import {setCookie} from 'nookies'
import Loading from "./loading";

const Input = styled.input`
  height: 48px;
  border-radius: 16px;
  border: 1px solid gray;
  padding-left: 15px;
  font-size: 20px;
  font-family: "Karla", sans-serif;
`;

const FormWrapper = styled.form`
  display: grid;
  grid-row-gap: 15px;
`;

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reqInfo = {
        identifier: username,
        password: password,
      };
      setLoading(true);
      const res = await useUser({ reqInfo });
      const loginRes = await res.json();

      if (res.status === 200) {
        setLoading(false);
        // auth complete, so piece of state that updates accordingly
        setCookie(null, 'jwt', loginRes.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/'
        })
        router.push('/')

        // setMessage("User created successfully");
      } else {
        setLoading(false);
        // setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {!loading ? <>
        <Input
        type="text"
        id="username"
        name="username"
        pattern=".{3,}"
        title="3 characters minimum"
        required
        placeholder="Username"
        value={username}
        onChange={(e => {setUsername(e.target.value)})}
      />

      <Input
        type="password"
        id="pass"
        name="pass"
        pattern=".{6,}"
        title="6 characters minimum"
        required
        placeholder="Password"
        value={password}
        onChange={(e) => {setPassword(e.target.value)}}

      />

      <FormButton/>
      </> : <Loading/>}

    </FormWrapper>
  );
}

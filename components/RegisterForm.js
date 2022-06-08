import { useState } from "react";
import styled from "styled-components";
import FormButton from "./FormButton";
import { useUser } from "../lib/useUser";
import { useRouter } from 'next/router'
import {setCookie} from 'nookies'

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
  grid-row-gap: 10px;
`;

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reqInfo = {
        username: username,
        email: email,
        password: password,
      };
      const res = await useUser({ reqInfo, type:'register' });
      const registerRes = await res.json();
      console.log(registerRes);
      if (res.status === 200) {
        setUsername("");
        setPassword("");
        setEmail('');
        setCookie(null, 'jwt', registerRes.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/'
        })
        router.push('/')
        // setMessage("User created successfully");
      } else {
        // setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Input
        type="email"
        id="email"
        name="email"
        required
        placeholder="Email"
        value={email}
        onChange={(evt) => {setEmail(evt.target.value)}}
      />
      <Input
        type="text"
        id="username"
        name="username"
        required
        placeholder="Username"
        value={username}
        onChange={(evt) => {setUsername(evt.target.value)}}
      />

      <Input
        type="password"
        id="pass"
        name="pass"
        required
        placeholder="Password"
        value={password}
        onChange={(evt) => {setPassword(evt.target.value)}}
      />

      <FormButton />
    </FormWrapper>
  );
}

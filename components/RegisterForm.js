import { useState } from "react";
import styled from "styled-components";
import FormButton from "./FormButton";
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

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()



  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqInfo = {
      username: username,
      email: email,
      password: password,
    };
    try {

      setLoading(true);
      const res = await useUser({ reqInfo, type:'register' });
      const registerRes = await res.json();
      if (res.status === 200) {
        setLoading(false);
        setUsername('');
        setPassword('');
        setEmail('');
        setCookie(null, 'jwt', registerRes.jwt, {
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
      {!loading ? <><Input
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
        pattern=".{3,}"
        title="3 characters minimum"
        required
        placeholder="Username"
        value={username}
        onChange={(evt) => {setUsername(evt.target.value)}}
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
        onChange={(evt) => {setPassword(evt.target.value)}}
      />

      <FormButton /> </> : <Loading />}

    </FormWrapper>
  );
}
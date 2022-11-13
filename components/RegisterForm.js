import { useState, useContext } from "react";
import styled from "styled-components";
import FormButton from "./FormButton";
import Loading from "./loading";
import AuthContext from "../context/AuthContext";
import Link from "next/link";
import Input from "./styles/Input";
import StyledSpan from "./styles/StyledSpan";
import CenterLink from "./styles/CenterLink";
import FormWrapper from "./styles/FormWrapper";

const Error = styled.p`
  margin: 0;
  color: red;
  font-family: "Karla", sans-serif;
  text-align: center;
`;

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqInfo = {
      username: username,
      email: email,
      password: password,
    };
    try {
      setLoading(true);
      const res = await fetch("/api/registerapi", {
        method: "POST",
        body: JSON.stringify(reqInfo),
      });
      const { id, error='' } = await res.json();
      if (res.status === 200) {
        setError('');
        setLoading(false);
        registerUser(username, id);
      } else {
        setError(error);
        setLoading(false);
      }
    } catch (err) {
      setError('Something went wrong during account creation');
      setLoading(false);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {!loading ? (
        <>
          {error && <Error>{error}</Error>}
          <Input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Email"
            value={email}
            onChange={(evt) => {
              setEmail(evt.target.value);
            }}
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
            onChange={(evt) => {
              setUsername(evt.target.value);
            }}
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
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}
          />
          <FormButton text="Register your account" />
          <StyledSpan>
            Already have an account?
            <Link href="/login" passHref>
              <CenterLink> Sign In</CenterLink>
            </Link>
          </StyledSpan>
        </>
      ) : (
        <Loading />
      )}
    </FormWrapper>
  );
}

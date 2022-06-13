import styled from "styled-components";
import FormButton from "./FormButton";
import { useState, useContext } from "react";
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

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reqInfo = {
        identifier: username,
        password: password,
      };
      setLoading(true);
      const res = await fetch("/api/loginapi", {
        method: "POST",
        body: JSON.stringify(reqInfo),
      });
      if (res.status === 200) {
        setLoading(false);
        loginUser(username);
        setError("");
      } else {
        setLoading(false);
        setError("Invalid credentials");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {!loading ? (
        <>
          {error && <Error>{error}</Error>}
          <Input
            type="text"
            id="username"
            name="username"
            required
            pattern=".{3,}"
            title="3 characters minimum"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <FormButton text="Login to Your Account" />
          <StyledSpan>
            Don&apos;t have an account?
            <Link href="/register" passHref>
              <CenterLink> Sign Up</CenterLink>
            </Link>
          </StyledSpan>
        </>
      ) : (
        <Loading />
      )}
    </FormWrapper>
  );
}

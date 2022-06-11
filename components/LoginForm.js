import styled from "styled-components";
import FormButton from "./FormButton";
import { useState, useContext } from "react";
import Loading from "./loading";
import AuthContext from "../context/AuthContext";
import Link from "next/link";

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

const Error = styled.p`
  margin: 0;
  color: red;
  font-family: "Karla", sans-serif;
  text-align: center;
`;

const CenterLink = styled.a`
  color: #4c9194;
  font-weight: 500;
`;

const StyledSpan = styled.span`
  font-family: "Karla", sans-serif;
  padding-top: 15px;
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

          <FormButton />
          <StyledSpan>
            Don't have an account?
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

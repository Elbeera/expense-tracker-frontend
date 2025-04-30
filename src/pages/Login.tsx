import React, { useState } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import WatchTowrButton from "../components/common/WatchTowrButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      Cookies.set("token", data.login.token, { expires: 1 });
      navigate("/expenses");
    },
    onError: (err: unknown) => {
      const errorMessage =
        (err as Error).message || "An error occurred during login.";
      setError(errorMessage);
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login({ variables: { email, password } });
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage =
        (err as Error).message || "An error occurred during login.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container alignContent={"center"} height={"100vh"}>
      <form onSubmit={handleLogin}>
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <WatchTowrButton
            type="submit"
            colorScheme="blue"
            width="100%"
            isLoading={isLoading}
          >
            Login
          </WatchTowrButton>
          <Text textAlign="center">
            Don't have an account?{" "}
            <Link color="blue.500" href="/signup">
              Sign Up
            </Link>
          </Text>
        </Stack>
      </form>
    </Container>
  );
};

export default Login;

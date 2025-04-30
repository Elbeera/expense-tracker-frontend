import React, { useState } from "react";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { signup } from "../services/api/auth";
import { useNavigate } from "react-router-dom";
import WatchTowrButton from "../components/common/WatchTowrButton";
import Cookies from "js-cookie"; // Ensure this is imported

const Signup = () => {
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const data = await signup(form);

      // Store the token in a cookie (expires in 1 day)
      Cookies.set("token", data.token, { expires: 1 });

      setSuccess(true);
      navigate("/expenses");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Signup failed");
      }
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={10}>
      <Heading mb={6} textAlign="center">
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </FormControl>
          <WatchTowrButton colorScheme="blue" type="submit" width="full">
            Sign Up
          </WatchTowrButton>
        </VStack>
      </form>

      {error && (
        <Alert mt={4} status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}

      {success && (
        <Alert mt={4} status="success">
          <AlertIcon />
          Signup successful!
        </Alert>
      )}
    </Box>
  );
};

export default Signup;

// src/components/Navbar.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Note the camelCase naming
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import WatchTowrButton from "../common/WatchTowrButton";

const Navbar = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  // Define the structure of your decoded JWT
  interface DecodedToken {
    userId: number;
    email: string;
    name: string;
  }

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token); // Decode JWT to get user info
        setUserEmail(decoded.email); // Set user email from token
        setUserName(decoded.name);
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  const handleLogout = () => {
    // Remove the token cookie
    Cookies.remove("token");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <Box as="nav" color="white" p={4} width={"100%"}>
      <Heading justifySelf={"center"} size="lg" color={"black"}>
        🗼 WatchTowr Expense Tracker 💰
      </Heading>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Text color="black" mr={4}>
            Welcome {userName}
          </Text>
          <Text color="black" mr={4}>
            Email: {userEmail}
          </Text>
        </Flex>
        <WatchTowrButton onClick={() => handleLogout()} colorScheme="red">
          Logout
        </WatchTowrButton>
      </Flex>
    </Box>
  );
};

export default Navbar;

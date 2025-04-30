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

  interface DecodedToken {
    userId: number;
    email: string;
    name: string;
  }

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUserEmail(decoded.email);
        setUserName(decoded.name);
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
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

import { Link as RouterLink } from "react-router-dom";
import { Box, Heading, Text, VStack, Image, Link } from "@chakra-ui/react";

import Navbar from "../components/Navbar";

//images
import Temple from "/temple4.jpg";

export default function Home() {
  return (
    <Box bg="gray.100" minH="100vh" display="flex" flexDir="column" gap={150}>
      <Navbar />
      <Box>
        <VStack>
          <Heading>Welcome to the Temple</Heading>
          <Image src={Temple} alt="temple" h="200px" />
          <Text>
            Please{" "}
            <Link as={RouterLink} to="/login" fontWeight="bold">
              login
            </Link>{" "}
            or if you don't have account{" "}
            <Link as={RouterLink} to="/signup" fontWeight="bold">
              sign up
            </Link>
            .
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}

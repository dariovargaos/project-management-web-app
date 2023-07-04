import { Box, Heading, Text, VStack } from "@chakra-ui/react";

import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <Box bg="gray.100" minH="100vh" display="flex" flexDir="column" gap={150}>
      <Navbar />
      <Box>
        <VStack>
          <Heading>Welcome to the Temple</Heading>
          <Text>Please login or if you don't have account sign up.</Text>
        </VStack>
      </Box>
    </Box>
  );
}

import { Box, Heading, Text, VStack, Image } from "@chakra-ui/react";

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
          <Text>Please login or if you don't have account sign up.</Text>
        </VStack>
      </Box>
    </Box>
  );
}

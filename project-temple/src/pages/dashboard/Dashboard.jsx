import { Box, SimpleGrid } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <SimpleGrid p="10px" spacing={10} minChildWidth="250px">
      <Box bg={"white"} h="200px" border={"1px solid black"}></Box>

      <Box bg={"white"} h="200px" border={"1px solid black"}></Box>
      <Box bg={"white"} h="200px" border={"1px solid black"}></Box>
      <Box bg={"white"} h="200px" border={"1px solid black"}></Box>
      <Box bg={"white"} h="200px" border={"1px solid black"}></Box>

      <Box bg={"white"} h="200px" border={"1px solid black"}></Box>
      <Box bg={"white"} h="200px" border={"1px solid black"}></Box>
      <Box bg={"white"} h="200px" border={"1px solid black"}></Box>
      <Box bg={"white"} h="200px" border={"1px solid black"}></Box>
    </SimpleGrid>
  );
}

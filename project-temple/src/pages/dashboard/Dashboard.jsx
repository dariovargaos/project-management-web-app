import { useCollection } from "../../hooks/useCollection";

import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";

export default function Dashboard() {
  const { documents, error } = useCollection("projects");

  return (
    <Box>
      <Heading>Dashboard</Heading>
      {error && <Text>{error}</Text>}
      <SimpleGrid p="10px" spacing={10} minChildWidth="250px">
        {documents &&
          documents.map((doc) => <Text key={doc.id}>{doc.name}</Text>)}
      </SimpleGrid>
    </Box>
  );
}

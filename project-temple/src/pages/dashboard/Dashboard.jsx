import { useCollection } from "../../hooks/useCollection";

import ProjectList from "../../components/ProjectList";

import { Box, Heading, Text } from "@chakra-ui/react";

export default function Dashboard() {
  const { documents, error } = useCollection("projects");

  return (
    <Box>
      <Heading>Dashboard</Heading>
      {error && <Text>{error}</Text>}
      {documents && <ProjectList projects={documents} />}
    </Box>
  );
}

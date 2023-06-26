import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function Project() {
  const { id } = useParams();
  const { document, error } = useDocument("projects", id);

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!document) {
    return <Text>Loading...</Text>;
  }
  return (
    <Box>
      <Heading>{document && document.name}</Heading>
    </Box>
  );
}

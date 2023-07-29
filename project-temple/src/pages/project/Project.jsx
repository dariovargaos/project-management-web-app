import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { SimpleGrid, Text, Progress } from "@chakra-ui/react";

//components
import ProjectSummary from "./ProjectSummary";
import ProjectComments from "./ProjectComments";

export default function Project() {
  const { id } = useParams();
  const { document, error } = useDocument("projects", id);

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!document) {
    return <Progress size="sm" isIndeterminate colorScheme="whatsapp" />;
  }
  return (
    <SimpleGrid columns="2" spacing={10} minChildWidth="250px">
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </SimpleGrid>
  );
}

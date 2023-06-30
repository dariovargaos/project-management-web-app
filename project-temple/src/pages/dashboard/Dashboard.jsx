import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { Box, Heading, Text } from "@chakra-ui/react";

//components
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";

export default function Dashboard() {
  const { documents, error } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("all");

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  return (
    <Box>
      <Heading>Dashboard</Heading>
      {error && <Text>{error}</Text>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {documents && <ProjectList projects={documents} />}
    </Box>
  );
}

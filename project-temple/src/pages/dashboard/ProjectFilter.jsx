import { useState } from "react";
import { Box, Button, Text, Flex, Divider } from "@chakra-ui/react";

const filterList = [
  "all",
  "mine",
  "development",
  "design",
  "marketing",
  "sales",
];

export default function ProjectFilter() {
  const [currentFilter, setCurrentFilter] = useState("all");

  const handleClick = (newFilter) => {
    console.log(newFilter);
    setCurrentFilter(newFilter);
  };

  return (
    <Box>
      <Flex as="nav" align="center" bg="white" gap={4}>
        <Text>Filter by:</Text>
        {filterList.map((filter) => (
          <Button
            key={filter}
            onClick={() => handleClick(filter)}
            variant="link"
          >
            {filter}
          </Button>
        ))}
      </Flex>
    </Box>
  );
}

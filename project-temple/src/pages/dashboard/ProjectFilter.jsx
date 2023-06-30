import { Box, Button, Text, Flex } from "@chakra-ui/react";

const filterList = [
  "all",
  "mine",
  "development",
  "design",
  "marketing",
  "sales",
];

export default function ProjectFilter({ currentFilter, changeFilter }) {
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
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

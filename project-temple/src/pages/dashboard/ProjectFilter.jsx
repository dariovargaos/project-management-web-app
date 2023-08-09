import { Text, Flex, Tabs, TabList, Tab } from "@chakra-ui/react";

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
    <Flex align="center">
      <Text>Filter by:</Text>
      <Tabs colorScheme="whatsapp">
        <TabList
          display="flex"
          flexDir={{ base: "column", md: "row", lg: "row" }}
        >
          {filterList.map((filter) => (
            <Tab key={filter} onClick={() => handleClick(filter)}>
              {filter}
            </Tab>
          ))}
        </TabList>
      </Tabs>
    </Flex>
  );
}

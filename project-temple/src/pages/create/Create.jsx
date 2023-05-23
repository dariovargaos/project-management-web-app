import { useState } from "react";

import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
  Button,
} from "@chakra-ui/react";

export default function Create() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, details, dueDate);
  };
  return (
    <Box display="flex" justifyContent="center">
      <Box
        bg="#fff"
        border="1px solid #ddd"
        p="40px"
        boxShadow="3px 3px 5px rgba(0,0,0, 0.05)"
        w="100%"
      >
        <Heading fontSize="2xl" mb="20px">
          Create a new project
        </Heading>
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
          <FormControl isRequired mb="40px">
            <FormLabel>Project name:</FormLabel>
            <Input
              required
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </FormControl>
          <FormControl isRequired mb="20px">
            <FormLabel>Project details:</FormLabel>
            <Textarea
              required
              type="text"
              onChange={(e) => setDetails(e.target.value)}
              value={details}
              resize="none"
            />
            <FormHelperText>Enter a descriptive project name.</FormHelperText>
          </FormControl>
          <FormControl isRequired mb="20px">
            <FormLabel>Due date:</FormLabel>
            <Input
              required
              type="date"
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
            />
          </FormControl>
          <FormControl isRequired mb="20px">
            <FormLabel>Project category:</FormLabel>
            <Input />
          </FormControl>
          <FormControl isRequired mb="20px">
            <FormLabel>Assign to:</FormLabel>
            <Input />
          </FormControl>

          <Button colorScheme="twitter" type="submit">
            Add project
          </Button>
        </form>
      </Box>
    </Box>
  );
}

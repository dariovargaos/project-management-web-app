import { useState, useEffect } from "react";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";

import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Text,
  Input,
  FormHelperText,
  Textarea,
  Button,
} from "@chakra-ui/react";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function Create() {
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);

  //form fields
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("Please select a project category");
      return;
    }

    if (assignedUsers.length < 1) {
      setFormError("Please assign the project to at least one user");
      return;
    }

    console.log(name, details, dueDate, category, assignedUsers);
  };
  return (
    <Box display="flex" justifyContent="center" mt="-10">
      <Box
        bg="#fff"
        border="1px solid #ddd"
        p="40px"
        boxShadow="3px 3px 5px rgba(0,0,0, 0.05)"
        minW="100%"
      >
        <Heading fontSize="2xl" mb="20px">
          Create a new project
        </Heading>
        <form onSubmit={handleSubmit}>
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
            <Select
              options={categories}
              onChange={(option) => setCategory(option)}
            />
          </FormControl>
          <FormControl isRequired mb="20px">
            <FormLabel>Assign to:</FormLabel>
            <Select
              onChange={(option) => setAssignedUsers(option)}
              options={users}
              isMulti
            />
          </FormControl>
          {formError && (
            <Text color="red" mb="20px">
              {formError}
            </Text>
          )}

          <Button colorScheme="twitter" type="submit">
            Add project
          </Button>
        </form>
      </Box>
    </Box>
  );
}

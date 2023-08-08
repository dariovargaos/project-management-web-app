import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { timestamp } from "../../firebase/config";

import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Text,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function Create() {
  const navigate = useNavigate();
  const { addDocument, response } = useFirestore("projects");
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();
  const toast = useToast();

  //form fields
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
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

  const handleSubmit = async (e) => {
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

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    const project = {
      name: name,
      details: details,
      category: category.value,
      dueDate: timestamp.fromDate(dueDate),
      comments: [],
      createdBy: createdBy,
      assignedUsersList,
      progress: 0,
      logs: [],
    };

    await addDocument(project);
    if (!response.error) {
      navigate("/");
      toast({
        title: "Project created.",
        status: "success",
        duration: "5000",
        isClosable: true,
      });
    }
  };
  return (
    <Box display="flex" justifyContent="center" mb="20px">
      <Box
        bg="#fff"
        border="1px solid #ddd"
        p="40px"
        boxShadow="3px 3px 5px rgba(0,0,0, 0.05)"
        minW="80%"
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
          </FormControl>
          <FormControl isRequired mb="20px">
            <FormLabel>Due date:</FormLabel>
            <Input
              required
              type="date"
              onChange={(e) => setDueDate(new Date(e.target.value))}
              value={dueDate.toISOString().split("T")[0]}
              min={new Date().toISOString().split("T")[0]}
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
          {!user.isAnonymous ? (
            <Button colorScheme="whatsapp" type="submit">
              Add project
            </Button>
          ) : (
            <Button colorScheme="whatsapp" isDisabled>
              Add project
            </Button>
          )}
        </form>
      </Box>
    </Box>
  );
}

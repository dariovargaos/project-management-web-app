import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { timestamp } from "../../firebase/config";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function EditForm({ project, isOpen, onClose }) {
  const { updateDocument, response } = useFirestore("projects");
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);

  //form fields
  const [name, setName] = useState(project.name);
  const [details, setDetails] = useState(project.details);
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

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    await updateDocument(project.id, {
      name: name,
      details: details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      assignedUsersList: assignedUsersList,
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
            <Button colorScheme="whatsapp" type="submit">
              Submit changes
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

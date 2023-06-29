import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";

//components
import UserAvatar from "../../components/UserAvatar";

export default function ProjectSummary({ project }) {
  const { deleteDocument } = useFirestore("projects");
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleDelete = (e) => {
    deleteDocument(project.id);
    navigate("/");
  };
  return (
    <Box>
      <Card maxH="400px">
        <CardHeader>
          <Heading size="md">{project.name}</Heading>
          <Text>By {project.createdBy.displayName}</Text>
        </CardHeader>
        <CardBody>
          <Text>Project due by: {project.dueDate.toDate().toDateString()}</Text>
          <Text>{project.details}</Text>
        </CardBody>
        <CardFooter display="flex" flexDirection="column">
          <Heading size="md" color="color.headingColor">
            {" "}
            Project is assinged to:
          </Heading>
          {project.assignedUsersList.map((user) => (
            <Flex key={user.id} flexDir="row">
              <UserAvatar src={user.photoURL} />
            </Flex>
          ))}
        </CardFooter>
      </Card>
      {user.uid === project.createdBy.id && (
        <Button colorScheme="whatsapp" onClick={handleDelete}>
          Delete project
        </Button>
      )}
    </Box>
  );
}

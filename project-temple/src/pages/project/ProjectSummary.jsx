import { useState } from "react";
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
import ProgressBar from "./ProgressBar";
import EditForm from "./EditForm";
import ProjectLogs from "./ProjectLogs";

export default function ProjectSummary({ project }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const { deleteDocument } = useFirestore("projects");
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleDelete = () => {
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
        <Button onClick={() => setShowEdit(true)} colorScheme="whatsapp">
          Edit project
        </Button>
      )}

      <Button onClick={() => setShowLogs(true)} colorScheme="whatsapp">
        Show logs
      </Button>

      {user.uid === project.createdBy.id && (
        <Button colorScheme="whatsapp" variant="ghost" onClick={handleDelete}>
          Delete project
        </Button>
      )}
      <ProgressBar project={project} />

      {showEdit && (
        <EditForm
          project={project}
          isOpen={showEdit}
          onClose={() => setShowEdit(false)}
        />
      )}

      {showLogs && (
        <ProjectLogs
          project={project}
          isOpen={showLogs}
          onClose={() => setShowLogs(false)}
        />
      )}
    </Box>
  );
}

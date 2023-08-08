import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Flex,
  Button,
  useToast,
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
  const toast = useToast();

  const handleDelete = () => {
    deleteDocument(project.id);
    navigate("/");
    toast({
      title: "Project deleted.",
      description: "Successfully deleted the project.",
      status: "success",
      duration: "5000",
      isClosable: true,
    });
  };
  return (
    <Flex flexDir="column" gap="10px">
      <Card maxH="400px">
        <CardHeader>
          <Heading size="md" color="color.headingColor">
            {project.name}
          </Heading>
          <Text color="color.headingColor">
            By {project.createdBy.displayName}
          </Text>
        </CardHeader>
        <CardBody>
          <Text color="color.textColor">
            Project due by: {project.dueDate.toDate().toDateString()}
          </Text>
          <Text color="color.textColor">{project.details}</Text>
        </CardBody>
        <CardFooter display="flex" flexDirection="column" gap="10px">
          <Heading size="sm" color="color.headingColor">
            Project is assinged to:
          </Heading>
          <Flex gap="10px" flexWrap="wrap">
            {project.assignedUsersList.map((user) => (
              <UserAvatar
                key={user.id}
                src={user.photoURL}
                name={user.displayName}
              />
            ))}
          </Flex>
        </CardFooter>
      </Card>
      <Flex gap="12px">
        {user.uid === project.createdBy.id && (
          <Button
            size="sm"
            onClick={() => setShowEdit(true)}
            colorScheme="whatsapp"
          >
            Edit project
          </Button>
        )}
        {!user.isAnonymous ? (
          <Button
            size="sm"
            onClick={() => setShowLogs(true)}
            colorScheme="whatsapp"
          >
            Show logs
          </Button>
        ) : (
          <Button size="sm" isDisabled colorScheme="whatsapp">
            Show logs
          </Button>
        )}

        {user.uid === project.createdBy.id && (
          <Button
            size="sm"
            colorScheme="whatsapp"
            variant="ghost"
            onClick={handleDelete}
          >
            Delete project
          </Button>
        )}
      </Flex>

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
    </Flex>
  );
}

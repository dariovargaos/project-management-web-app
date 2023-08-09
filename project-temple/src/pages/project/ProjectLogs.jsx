import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { timestamp } from "../../firebase/config";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Textarea,
  Button,
  Text,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";

export default function ProjectLogs({ project, isOpen, onClose }) {
  const [log, setLog] = useState("");
  const { updateDocument, response } = useFirestore("projects");
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const logToAdd = {
      displayName: user.displayName,
      content: log,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    await updateDocument(project.id, {
      logs: [...project.logs, logToAdd],
    });

    setLog("");
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p="10px" w={["90%", "50%", "40%", "30%"]} gap={3}>
        <ModalHeader ml="-25px">Project logs</ModalHeader>
        <ModalCloseButton />

        {project.logs.length < 1 && <Text mt="10px">No logs yet!</Text>}
        {project.logs.map((log) => (
          <Card key={log.id} size="sm" variant="outline">
            <CardHeader fontWeight="bold">by {log.displayName}</CardHeader>
            <CardBody>
              <Text>
                {formatDistanceToNow(log.createdAt.toDate(), {
                  addSuffix: true,
                })}
              </Text>
              <Text color="color.textColor">{log.content}</Text>
            </CardBody>
          </Card>
        ))}
        {user.uid === project.createdBy.id && (
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Textarea
                  type="text"
                  isRequired
                  onChange={(e) => setLog(e.target.value)}
                  value={log}
                  resize="none"
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="whatsapp"
                mt="10px"
                size={{ base: "sm", md: "md", lg: "md" }}
              >
                Add log
              </Button>
            </form>
          </ModalBody>
        )}
        {user.uid !== project.createdBy.id && (
          <Text color="red" mt="10px">
            You dont have permission to add logs.
          </Text>
        )}
      </ModalContent>
    </Modal>
  );
}

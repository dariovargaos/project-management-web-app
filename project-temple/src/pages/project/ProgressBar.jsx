import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Box, Input, Text, Flex, Progress } from "@chakra-ui/react";

export default function ProgressBar({ project }) {
  const [progressInput, setProgressInput] = useState("");
  const { updateDocument } = useFirestore("projects");
  const { user } = useAuthContext();

  const handleInput = (e) => {
    e.preventDefault();

    updateDocument(project.id, {
      progress: progressInput,
    });

    setProgressInput("");
  };

  const getColor = () => {
    if (project.progress < 40) {
      return "#ff0000";
    } else if (project.progress < 70) {
      return "#ffa500";
    } else {
      return "#2ecc71";
    }
  };

  return (
    <Flex flexDir="column" gap="12px" mt="12px">
      <Box w="100%" height="30px" borderRadius="10px" bg="#e6e6e6">
        <Flex
          height="100%"
          w={`${project.progress}%`}
          p="3px"
          borderRadius="10px"
          bg={getColor()}
          transition="width 0.5s ease-out"
        >
          <Text fontWeight="bold" color="#444444">
            {project.progress}%
          </Text>
        </Flex>
      </Box>
      {user.uid === project.createdBy.id && (
        <form onSubmit={handleInput}>
          <Input
            type="number"
            min="0"
            max="100"
            bg="white"
            onChange={(e) => setProgressInput(e.target.value)}
            value={progressInput}
            placeholder="0"
          />
        </form>
      )}
      {/* <Progress value={progress} h="30px" bg="#e6e6e6" borderRadius="10px" /> */}
    </Flex>
  );
}

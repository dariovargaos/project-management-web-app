import { useState } from "react";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  Button,
} from "@chakra-ui/react";

export default function ProjectComments({ project }) {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore("projects");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };
    await updateDocument(project.id, {
      comments: [...project.comment, commentToAdd],
    });

    if (!response.error) {
      setNewComment("");
    }
  };
  return (
    <Box>
      <Heading size="sm">Project Comments</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Add new comment:</FormLabel>
          <Textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            bg="white"
          />
        </FormControl>
        <Button type="submit">Add Comment</Button>
      </form>
    </Box>
  );
}
